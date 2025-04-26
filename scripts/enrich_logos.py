#!/usr/bin/env python3
"""
Clearbit → Airtable logo enricher
---------------------------------
* Free: Clearbit Autocomplete + Logo CDN
* Optional: ChatGPT (or Gemini) only when Clearbit fails

Install:
    pip install pyairtable requests tldextract openai
         # omit openai if you don’t need the LLM fallback
"""

import os, time, requests, re
import tldextract
from pyairtable import Api

# ---------------- Airtable setup -----------------
api   = Api(os.getenv("AIRTABLE_TOKEN"))
table = api.table(os.getenv("AIRTABLE_BASE_ID"), os.getenv("AIRTABLE_TABLE"))

NAME_FIELD = "Name"        # column that holds the tool/company name
URL_FIELD  = "Logo URL"    # single-line text
FILE_FIELD = "Logo File"   # attachment field (array of {url: …})

MAX_BATCH  = 10   # Airtable PATCH limit
PAUSE_SEC  = 1.0  # courteous pause per batch

# --------------- Optional LLM fallback ----------
OPENAI_KEY = os.getenv("OPENAI_API_KEY")     # leave empty to skip fallback
if OPENAI_KEY:
    import openai
    openai.api_key = OPENAI_KEY

# quick manual fixes
ALIAS_MAP = {
    "dbt":        "dbtlabs.com",
    "Gemini":     "ai.google",      # Google’s Gemini
    "Anthropic":  "anthropic.com",
}

# --------------- Helpers ------------------------

def clean_domain(raw: str) -> str | None:
    """Return domain.suffix or None."""
    parts = tldextract.extract(raw)
    return f"{parts.domain}.{parts.suffix}" if parts.domain and parts.suffix else None

def clearbit_domain(name: str) -> str | None:
    r = requests.get(
        "https://autocomplete.clearbit.com/v1/companies/suggest",
        params={"query": name}, timeout=10
    ).json()
    if isinstance(r, list) and r:
        return clean_domain(r[0].get("domain") or "")
    return None

def llm_domain(name: str) -> str | None:
    if not OPENAI_KEY:
        return None
    prompt = (f"What is the primary internet domain (no subpages) for the company, "
              f"product, or open-source project named '{name}'? "
              f"Return just the domain such as 'shopify.com'.")
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-4o-mini",                             # cheap & fast
            messages=[{"role": "user", "content": prompt}],
            max_tokens=20, temperature=0,
        )
        text = resp.choices[0].message.content.lower().strip()
        m = re.search(r"\b[\w.-]+\.[a-z]{2,}\b", text)
        return clean_domain(m.group(0)) if m else None
    except Exception as e:
        print("⚠️  LLM lookup failed:", e)
        return None

def domain_for(name: str) -> str | None:
    return (
        ALIAS_MAP.get(name)
        or clearbit_domain(name)
        or llm_domain(name)
    )

def logo_url_for(name: str) -> str | None:
    domain = domain_for(name)
    if not domain:
        print(f"❌  No domain found for '{name}' – skipping")
        return None
    return f"https://logo.clearbit.com/{domain}"

# --------------- Main loop ----------------------

batch = []

for rec in table.all():
    fields = rec["fields"]
    name   = fields.get(NAME_FIELD)
    print("Processing", name)

    # skip if already enriched
    if not name or fields.get(URL_FIELD) or fields.get(FILE_FIELD):
        continue

    url = logo_url_for(name)
    if not url:
        continue

    batch.append({
        "id": rec["id"],
        "fields": {
            URL_FIELD: url,
            FILE_FIELD: [{"url": url}],
        },
    })

    if len(batch) == MAX_BATCH:
        table.batch_update(batch)
        batch.clear()
        time.sleep(PAUSE_SEC)

# flush remainder
if batch:
    table.batch_update(batch)
