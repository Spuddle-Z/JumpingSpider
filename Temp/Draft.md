```dataviewjs
const recurrence = [{completed: false, id: "^P5G4JV74", text: "试试", due: "2024-09-11", repeat: "Weekly", priority: "Normal"}];
const idEscaped = recurrence[0].id.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
let content = `- [ ] [id:: ^P5G4JV74] [text:: 试试] [due:: 2024-09-11] [repeat:: Weekly] [priority:: Normal]\n`;
const regex = new RegExp(`^.*?\\[id:: ${idEscaped}\\].*?\\n`, 'gm');
const matches = content.match(regex);

if (matches) {
	dv.paragraph("找到的匹配结果:" + matches);
} else {
	dv.paragraph("没有找到匹配的 ID");
}

const cpl = recurrence[0].completed ? "x" : " ";
content = content.replace(regex, "- [" + cpl + "] [id:: " + recurrence[0].id + "] [text:: " + recurrence[0].text + "] [due:: " + recurrence[0].due + "] [repeat:: None] [priority:: " + recurrence[0].priority + "]\n");
dv.paragraph(content)
```