// This file provides mappings from Airtable tool IDs to human-readable tool names

// Define a type for the tool map
type ToolMap = Record<string, string>

// Create a mapping of tool IDs to their display names
export function getToolNameMap(): ToolMap {
  return {
    // Specific tool IDs from your Airtable - EXACT MATCHES
    // Original mappings
    recBMAXELcCr9mAQA: "Quizlet",
    recWxxQuBh7v158rI: "Khan Academy",
    recnTnrVJwYkVpQjl: "YouTube",
    recn6X0OycoKAArTg: "Microsoft Office",
    recGg251S6HVAziXt: "Qualtrics", // Updated from Excel to Qualtrics based on the data
    recr9nVnigk1QK4WP: "Stata", // Updated from PowerPoint to Stata based on the data

    // New mappings from the provided Airtable data
    reciUl6oNqqV83iDI: "Snowflake",
    recY7Hdkceeq1BHlc: "Databricks",
    recRZymNe0MCNQ8DE: "Jira",
    recMf0OYdqlvyh15t: "Tableau",
    recP9Kycl9U6T4FtH: "Looker",
    rec0khXp0BqLX9LAf: "Airflow",
    recldxZx5pXxU4i59: "dbt",
    recBQisrWOrwXg8qG: "Supabase",
    recuJFy6sbSwHhxwk: "PostgreSQL",
    rectOt84NhBzieytu: "AWS",
    rec8ywQxyIkcRgCFf: "Heroku",
    reczFw3BnuuAr9CuR: "Mixpanel",
    reciomy6daptSpQjj: "Zapier",
    recKaIVp324egkhFj: "Adobe Illustrator",
    recccxeyBLcyfQSl8: "Adobe Analytics",
    rec9NASk4SQMjXE5c: "Google Workspace",
    recQ4EKY1VRj6lbma: "HubSpot",
    recxD46zgaVkjEkWx: "Meta Business Suite",
    recYneN0MUcxu1k9g: "Airtable",
    recgBs54Vzy3opPeZ: "Notion",
    recQSVjhSCnjKJJ3L: "Figma",
    rec3BQejI5kJGEkaE: "Shopify",
    rec67XHzVxYpHeJq9: "ChatGPT",
    recUSnPf66fZxhklr: "Anthropic AI Claude",
    rec0LWQThxfUPN4eL: "Gemini",
    recOyMlUh6oru9dEd: "Cursor",
    recMQ5cZsdyNNB1OM: "Replit",
    recoKJC33kqiyagfg: "v0",
    recC1iNVR63bwI5nh: "Lovable",
    rec0Bem72BodFq5An: "Hugging Face",
    reczuNa5xYWviqV61: "LangChain AI",
    recOXVEHTFj2ICTgk: "MongoDB",
    recMcTklIObaLSqtS: "Cloudinary",
    recI5NPVuSxsYM3sn: "Webflow",
    recbc6lcn3nx4BENu: "Shippo",
    recXTBHEi7rssRVfn: "Flowcode",
    recYCWsskMVjMcs8y: "Canva",
    recNaQjHom4pObhhh: "Jotform",
    recmYRcfKYQlbHpcM: "Google Analytics",
    recLB3mJ08Wbz5yK4: "Docker",
    rec4kpBaei5MFckjI: "Verint",
    recMkNfN9wcGC7aB5: "Typeform",
    recP9FSxqRAtKE0SH: "Eventbrite",
    rec8JtOpticiqwaf3: "Alteryx",
    recarYJus8VuUNYIL: "GitHub",
    recn1du2fwrJEDdbE: "Jupyter Notebook",
    rec6JyVwYsovzXghJ: "VS Code",

    // Common variations of the same IDs (sometimes they come with different formatting)
    "recBMAXELcCr9mAQA - Quizlet": "Quizlet",
    "recWxxQuBh7v158rI - Khan Academy": "Khan Academy",
    "recnTnrVJwYkVpQjl - YouTube": "YouTube",
    "recn6X0OycoKAArTg - Microsoft Office": "Microsoft Office",
    "recGg251S6HVAziXt - Qualtrics": "Qualtrics",
    "recr9nVnigk1QK4WP - Stata": "Stata",

    // Just the names in case they're passed directly
    Quizlet: "Quizlet",
    "Khan Academy": "Khan Academy",
    YouTube: "YouTube",
    "Microsoft Office": "Microsoft Office",
    Excel: "Excel",
    PowerPoint: "PowerPoint",
    Snowflake: "Snowflake",
    Databricks: "Databricks",
    Jira: "Jira",
    Tableau: "Tableau",
    Looker: "Looker",
    Airflow: "Airflow",
    dbt: "dbt",
    Supabase: "Supabase",
    PostgreSQL: "PostgreSQL",
    AWS: "AWS",
    Heroku: "Heroku",
    Mixpanel: "Mixpanel",
    Zapier: "Zapier",
    "Adobe Illustrator": "Adobe Illustrator",
    "Adobe Analytics": "Adobe Analytics",
    "Google Workspace": "Google Workspace",
    HubSpot: "HubSpot",
    "Meta Business Suite": "Meta Business Suite",
    Airtable: "Airtable",
    Notion: "Notion",
    Figma: "Figma",
    Shopify: "Shopify",
    ChatGPT: "ChatGPT",
    "Anthropic AI Claude": "Anthropic AI Claude",
    Gemini: "Gemini",
    Cursor: "Cursor",
    Replit: "Replit",
    v0: "v0",
    Lovable: "Lovable",
    "Hugging Face": "Hugging Face",
    "LangChain AI": "LangChain AI",
    MongoDB: "MongoDB",
    Cloudinary: "Cloudinary",
    Webflow: "Webflow",
    Shippo: "Shippo",
    Flowcode: "Flowcode",
    Canva: "Canva",
    Jotform: "Jotform",
    "Google Analytics": "Google Analytics",
    Docker: "Docker",
    Stata: "Stata",
    Verint: "Verint",
    Qualtrics: "Qualtrics",
    Typeform: "Typeform",
    Eventbrite: "Eventbrite",
    Alteryx: "Alteryx",
    GitHub: "GitHub",
    "Jupyter Notebook": "Jupyter Notebook",
    "VS Code": "VS Code",

    // Common data and analytics tools
    recT1: "Tableau",
    recT2: "Power BI",
    recT3: "Excel",
    recT4: "Python",
    recT5: "R",
    recT6: "SQL",
    recT7: "SPSS",
    recT8: "SAS",
    recT9: "Stata",
    recT10: "Google Analytics",
    recT11: "Looker",
    recT12: "Domo",
    recT13: "Alteryx",
    recT14: "Jupyter Notebooks",
    recT15: "Pandas",
    recT16: "NumPy",
    recT17: "TensorFlow",
    recT18: "PyTorch",
    recT19: "scikit-learn",
    recT20: "Matplotlib",

    // Media and entertainment specific tools
    recM1: "Adobe Analytics",
    recM2: "Nielsen",
    recM3: "Comscore",
    recM4: "Conviva",
    recM5: "Amplitude",
    recM6: "Mixpanel",
    recM7: "Adobe Creative Suite",
    recM8: "Final Cut Pro",
    recM9: "Avid",
    recM10: "Premiere Pro",
    recM11: "After Effects",
    recM12: "Photoshop",
    recM13: "Illustrator",
    recM14: "InDesign",

    // Business and project management tools
    recB1: "Microsoft Office",
    recB2: "Google Workspace",
    recB3: "Slack",
    recB4: "Asana",
    recB5: "Trello",
    recB6: "Jira",
    recB7: "Confluence",
    recB8: "Microsoft Project",
    recB9: "Salesforce",
    recB10: "HubSpot",
    recB11: "Zoom",
    recB12: "Microsoft Teams",
    recB13: "Notion",
    recB14: "Airtable",
    recB15: "Monday.com",
  }
}

// Function to get a tool name from an ID, with fallback
export function getToolName(toolId: string): string {
  if (!toolId) return "Unknown Tool"

  const toolMap = getToolNameMap()
  console.log(`Attempting to map tool ID: "${toolId}"`)

  // Check if we have a direct mapping
  if (toolMap[toolId]) {
    console.log(`Found direct mapping for "${toolId}": "${toolMap[toolId]}"`)
    return toolMap[toolId]
  }

  // Check for specific known IDs regardless of format
  const knownIds = {
    // Original mappings
    recBMAXELcCr9mAQA: "Quizlet",
    recWxxQuBh7v158rI: "Khan Academy",
    recnTnrVJwYkVpQjl: "YouTube",
    recn6X0OycoKAArTg: "Microsoft Office",
    recGg251S6HVAziXt: "Qualtrics",
    recr9nVnigk1QK4WP: "Stata",

    // New mappings from the provided Airtable data
    reciUl6oNqqV83iDI: "Snowflake",
    recY7Hdkceeq1BHlc: "Databricks",
    recRZymNe0MCNQ8DE: "Jira",
    recMf0OYdqlvyh15t: "Tableau",
    recP9Kycl9U6T4FtH: "Looker",
    rec0khXp0BqLX9LAf: "Airflow",
    recldxZx5pXxU4i59: "dbt",
    recBQisrWOrwXg8qG: "Supabase",
    recuJFy6sbSwHhxwk: "PostgreSQL",
    rectOt84NhBzieytu: "AWS",
    rec8ywQxyIkcRgCFf: "Heroku",
    reczFw3BnuuAr9CuR: "Mixpanel",
    reciomy6daptSpQjj: "Zapier",
    recKaIVp324egkhFj: "Adobe Illustrator",
    recccxeyBLcyfQSl8: "Adobe Analytics",
    rec9NASk4SQMjXE5c: "Google Workspace",
    recQ4EKY1VRj6lbma: "HubSpot",
    recxD46zgaVkjEkWx: "Meta Business Suite",
    recYneN0MUcxu1k9g: "Airtable",
    recgBs54Vzy3opPeZ: "Notion",
    recQSVjhSCnjKJJ3L: "Figma",
    rec3BQejI5kJGEkaE: "Shopify",
    rec67XHzVxYpHeJq9: "ChatGPT",
    recUSnPf66fZxhklr: "Anthropic AI Claude",
    rec0LWQThxfUPN4eL: "Gemini",
    recOyMlUh6oru9dEd: "Cursor",
    recMQ5cZsdyNNB1OM: "Replit",
    recoKJC33kqiyagfg: "v0",
    recC1iNVR63bwI5nh: "Lovable",
    rec0Bem72BodFq5An: "Hugging Face",
    reczuNa5xYWviqV61: "LangChain AI",
    recOXVEHTFj2ICTgk: "MongoDB",
    recMcTklIObaLSqtS: "Cloudinary",
    recI5NPVuSxsYM3sn: "Webflow",
    recbc6lcn3nx4BENu: "Shippo",
    recXTBHEi7rssRVfn: "Flowcode",
    recYCWsskMVjMcs8y: "Canva",
    recNaQjHom4pObhhh: "Jotform",
    recmYRcfKYQlbHpcM: "Google Analytics",
    recLB3mJ08Wbz5yK4: "Docker",
    rec4kpBaei5MFckjI: "Verint",
    recMkNfN9wcGC7aB5: "Typeform",
    recP9FSxqRAtKE0SH: "Eventbrite",
    rec8JtOpticiqwaf3: "Alteryx",
    recarYJus8VuUNYIL: "GitHub",
    recn1du2fwrJEDdbE: "Jupyter Notebook",
    rec6JyVwYsovzXghJ: "VS Code",
  }

  // Check if the toolId contains any of our known IDs
  for (const [id, name] of Object.entries(knownIds)) {
    if (toolId.includes(id)) {
      console.log(`Found known ID "${id}" in "${toolId}", mapping to "${name}"`)
      return name
    }
  }

  // Try to extract a name if the ID is followed by a name
  // This handles formats like "recXXXXXXX - Tool Name"
  const nameMatch = toolId.match(/^rec[A-Za-z0-9]+\s*[-:]\s*(.+)$/)
  if (nameMatch && nameMatch[1]) {
    console.log(`Extracted name from "${toolId}": "${nameMatch[1].trim()}"`)
    return nameMatch[1].trim()
  }

  // If it's a record ID format (starts with 'rec' followed by alphanumeric chars)
  if (toolId.match(/^rec[A-Za-z0-9]+$/)) {
    console.log(`"${toolId}" appears to be an Airtable record ID with no name`)
    return `Tool (${toolId})`
  }

  // If it's not an ID format, return the original string
  console.log(`"${toolId}" is not in Airtable ID format, returning as is`)
  return toolId
}

// Function to get a display name that always works
export function getToolDisplayName(tool: { name?: string; originalId?: string }): string {
  // First priority: Check if the originalId is one of our known IDs
  if (tool.originalId) {
    const knownIds: Record<string, string> = {
      // Original mappings
      recBMAXELcCr9mAQA: "Quizlet",
      recWxxQuBh7v158rI: "Khan Academy",
      recnTnrVJwYkVpQjl: "YouTube",
      recn6X0OycoKAArTg: "Microsoft Office",
      recGg251S6HVAziXt: "Qualtrics",
      recr9nVnigk1QK4WP: "Stata",

      // New mappings from the provided Airtable data
      reciUl6oNqqV83iDI: "Snowflake",
      recY7Hdkceeq1BHlc: "Databricks",
      recRZymNe0MCNQ8DE: "Jira",
      recMf0OYdqlvyh15t: "Tableau",
      recP9Kycl9U6T4FtH: "Looker",
      rec0khXp0BqLX9LAf: "Airflow",
      recldxZx5pXxU4i59: "dbt",
      recBQisrWOrwXg8qG: "Supabase",
      recuJFy6sbSwHhxwk: "PostgreSQL",
      rectOt84NhBzieytu: "AWS",
      rec8ywQxyIkcRgCFf: "Heroku",
      reczFw3BnuuAr9CuR: "Mixpanel",
      reciomy6daptSpQjj: "Zapier",
      recKaIVp324egkhFj: "Adobe Illustrator",
      recccxeyBLcyfQSl8: "Adobe Analytics",
      rec9NASk4SQMjXE5c: "Google Workspace",
      recQ4EKY1VRj6lbma: "HubSpot",
      recxD46zgaVkjEkWx: "Meta Business Suite",
      recYneN0MUcxu1k9g: "Airtable",
      recgBs54Vzy3opPeZ: "Notion",
      recQSVjhSCnjKJJ3L: "Figma",
      rec3BQejI5kJGEkaE: "Shopify",
      rec67XHzVxYpHeJq9: "ChatGPT",
      recUSnPf66fZxhklr: "Anthropic AI Claude",
      rec0LWQThxfUPN4eL: "Gemini",
      recOyMlUh6oru9dEd: "Cursor",
      recMQ5cZsdyNNB1OM: "Replit",
      recoKJC33kqiyagfg: "v0",
      recC1iNVR63bwI5nh: "Lovable",
      rec0Bem72BodFq5An: "Hugging Face",
      reczuNa5xYWviqV61: "LangChain AI",
      recOXVEHTFj2ICTgk: "MongoDB",
      recMcTklIObaLSqtS: "Cloudinary",
      recI5NPVuSxsYM3sn: "Webflow",
      recbc6lcn3nx4BENu: "Shippo",
      recXTBHEi7rssRVfn: "Flowcode",
      recYCWsskMVjMcs8y: "Canva",
      recNaQjHom4pObhhh: "Jotform",
      recmYRcfKYQlbHpcM: "Google Analytics",
      recLB3mJ08Wbz5yK4: "Docker",
      rec4kpBaei5MFckjI: "Verint",
      recMkNfN9wcGC7aB5: "Typeform",
      recP9FSxqRAtKE0SH: "Eventbrite",
      rec8JtOpticiqwaf3: "Alteryx",
      recarYJus8VuUNYIL: "GitHub",
      recn1du2fwrJEDdbE: "Jupyter Notebook",
      rec6JyVwYsovzXghJ: "VS Code",
    }

    if (knownIds[tool.originalId]) {
      return knownIds[tool.originalId]
    }
  }

  // Second priority: If the name doesn't look like an ID, use it
  if (tool.name && !tool.name.startsWith("Tool (rec")) {
    return tool.name
  }

  // Third priority: Try to extract a name from the originalId
  if (tool.originalId) {
    const nameMatch = tool.originalId.match(/^rec[A-Za-z0-9]+\s*[-:]\s*(.+)$/)
    if (nameMatch && nameMatch[1]) {
      return nameMatch[1].trim()
    }
  }

  // Last resort: Return the name or a generic fallback
  return tool.name || "Unknown Tool"
}
