``` mermaid
flowchart TB
subgraph "`**USER MODEL**`"
    id1[(Database)]--> user[
    name
    email
    roles
    createdon
    password]
end
subgraph "`**LOGIN**`"

   user2[
    name
    email
    roles
    createdon
    password]--> Regester[name,email,password]


end
```