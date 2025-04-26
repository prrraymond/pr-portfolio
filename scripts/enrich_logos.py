#!/usr/bin/env python3
"""
Brandfetch → Airtable logo enricher
Requirements:
  pip install pyairtable requests
"""
import os, time, requests
from pyairtable import Api
api   = Api(os.getenv("AIRTABLE_TOKEN"))
table = api.table(os.getenv("AIRTABLE_BASE_ID"), os.getenv("AIRTABLE_TABLE"))


# Airtable fields — change if your base uses different names
NAME_FIELD = "Name"
URL_FIELD  = "Logo URL"
FILE_FIELD = "Logo File"

MAX_BATCH  = 10          # Airtable PATCH limit
PAUSE_SEC  = 1.0         # be nice to the API

# table = Table(os.getenv("AIRTABLE_TOKEN"),
#               os.getenv("AIRTABLE_BASE_ID"),
#               os.getenv("AIRTABLE_TABLE"))
BF_KEY = os.getenv("BRANDFETCH_KEY")
BF_CID = os.getenv("BRANDFETCH_CLIENT_ID")


def best_logo(brand: dict) -> str | None:
    for asset in brand.get("logos", []):
        if asset["type"] not in ("logo", "icon"):
            continue
        svg = next((f for f in asset["formats"] if f["format"] == "svg"), None)
        return (svg or asset["formats"][0])["src"]

def fetch_logo_url(company: str) -> str | None:
    res = requests.get(
        f"https://api.brandfetch.io/v2/search/{company}",
        params={"c": BF_CID},
        timeout=10,
    ).json()

    # Guard: Brandfetch may return [] or {"error": "..."}
    if not isinstance(res, list) or not res:
        print(f"❌  No Brandfetch hit for '{company}' – skipping")
        return None

    domain = res[0].get("domain")
    if not domain:
        print(f"❌  No domain in result for '{company}' – skipping")
        return None

    brand = requests.get(
        f"https://api.brandfetch.io/v2/brands/{domain}",
        headers={"Authorization": f"Bearer {BF_KEY}"},
        timeout=10,
    ).json()

    return best_logo(brand)

updates = []
for rec in table.all():
    name = rec["fields"].get(NAME_FIELD)
    print("Processing", name)
    f = rec["fields"]
    if URL_FIELD in f or FILE_FIELD in f:
        continue
    name = f.get(NAME_FIELD)
    if not name:
        continue
    url = fetch_logo_url(name)
    if not url:
        print("No logo found for", name)
        continue
    updates.append({"id": rec["id"],
                    "fields": {URL_FIELD: url,
                               FILE_FIELD: [{"url": url}]}})
    if len(updates) == MAX_BATCH:
        table.batch_update(updates)
        updates.clear()
        time.sleep(PAUSE_SEC)

if updates:
    table.batch_update(updates)
