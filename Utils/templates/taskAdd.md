---
<%*
const file = tp.file.find_tfile("Temp/To Do.md")
const loggedItem = await tp.system.prompt("What's Up?")
const time = tp.date.now("YYYY-MM-DD")
const content = (await app.vault.read(file)).split("\n")
const index = content.indexOf("## 闲白儿")
content.splice(index + 1, 0, `- ${time} - ${loggedItem}`)
await app.vault.modify(file, content.join("\n"))
-%>
---
