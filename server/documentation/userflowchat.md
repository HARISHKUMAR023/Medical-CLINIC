
``` mermaid
flowchart TD
    A[Start] --> B{email & pass in database match  ?}
    B -->|Yes| C[name,email,token]


    B ---->|No| E[unaundicated]
    E---->B

```