/**
 * Build Code Lab exercises from every slide title in slides_outline.md.
 * Run: node scripts/generate-lab-examples-from-slides.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outlinePath = join(
  root,
  'curriculum/python-software-engineer-bootcamp/slides_outline.md',
);

function parseOutline(text) {
  const slides = [];
  let week = 0;
  let weekTitle = '';
  let module = 0;
  let moduleTitle = '';
  let slideNo = 0;

  for (const line of text.split(/\r?\n/)) {
    const weekMatch = line.match(/^# Week (\d+)\s*[—–-]\s*(.+)$/);
    if (weekMatch) {
      week = Number(weekMatch[1]);
      weekTitle = weekMatch[2].trim();
      continue;
    }
    const modMatch = line.match(/^## Module (\d+):\s*(.+)$/);
    if (modMatch) {
      module = Number(modMatch[1]);
      moduleTitle = modMatch[2].trim();
      slideNo = 0;
      continue;
    }
    const slideMatch = line.match(/^\d+\.\s+(.+)$/);
    if (slideMatch && week && module) {
      slideNo += 1;
      slides.push({
        week,
        weekTitle,
        module,
        moduleTitle,
        slide: slideNo,
        title: slideMatch[1].trim(),
      });
    }
  }
  return slides;
}

function py(strings, ...values) {
  // Build code with real newlines
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < values.length) out += values[i];
  });
  return out.replace(/^\n/, '');
}

function codeForSlide(slide) {
  const t = slide.title;
  const tl = t.toLowerCase();
  const m = slide.module;
  const topic = t.replace(/"/g, "'");

  // Prefer concrete runnable drills for coding-oriented slides
  if (/print\s*\(|input\s*\(/.test(tl) || /greeting|first python program|basic input/.test(tl)) {
    return py`
name = "ComputerGeek"
print("Hello,", name)
print("Slide:", "${topic}")
`;
  }
  if (/comment/.test(tl)) {
    return py`
# ${topic}
# Document why the next line exists
message = "Readable code helps teams"
print(message)
`;
  }
  if (/variable|assignment|naming/.test(tl) && m <= 4) {
    return py`
student_name = "Alex"
course = "Python Bootcamp"
is_active = True
print(student_name, course, is_active)
`;
  }
  if (/type conversion|type\(\)|dynamic typing|integers|floating|boolean|strings|none\b/.test(tl)) {
    return py`
raw = "42"
number = int(raw)
flag = True
label = "ok"
print(type(raw).__name__, type(number).__name__, type(flag).__name__)
print(number, label)
`;
  }
  if (/operator|precedence|f-string|string format|comparison|logical/.test(tl)) {
    return py`
price = 49.99
qty = 2
tax = 0.13
total = round(price * qty * (1 + tax), 2)
print(f"Total CA\${total:.2f}")
print(qty > 0 and total > 0)
`;
  }
  if (/if \/|if statement|elif|else|truthy|falsy|match \/ case|conditional|decision|access decision/.test(tl)) {
    return py`
score = 78
if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
else:
    grade = "C"
print("grade:", grade)
`;
  }
  if (/while|for loop|range\(|break|continue|pass|nested loop|iterat/.test(tl)) {
    return py`
total = 0
for i in range(1, 5):
    if i == 2:
        continue
    total += i
    print("i", i, "total", total)
print("done", total)
`;
  }
  if (/list comprehension|dict comprehension|set comprehension|comprehension/.test(tl)) {
    return py`
nums = [1, 2, 3, 4]
squares = [n * n for n in nums if n % 2 == 0]
print(squares)
`;
  }
  if (/list|tuple|set|dict|slicing|indexing|enumerate|zip|sorting|collection/.test(tl) && m <= 5) {
    return py`
items = ["KB-01", "MS-02", "MN-03"]
stock = {"KB-01": 12, "MS-02": 30}
print(items[0], items[-1], items[:2])
print(stock.get("KB-01"), len(set(items)))
`;
  }
  if (/function|parameter|argument|return|lambda|closure|args|kwargs|scope|legb|docstring|pure function|recursion/.test(tl)) {
    return py`
def line_total(price, qty=1):
    return round(price * qty, 2)

print(line_total(19.99, 3))
print(line_total(10))
`;
  }
  if (/class|object-oriented|inheritance|composition|polymorphism|method|dataclass|encapsulation|solid/.test(tl)) {
    return py`
class Product:
    def __init__(self, sku, price):
        self.sku = sku
        self.price = price

p = Product("KB-01", 79.0)
print(p.sku, p.price)
`;
  }
  if (/exception|try|except|raise|traceback|error|logging|defensive|validation|assert/.test(tl)) {
    return py`
class ValidationError(Exception):
    pass

def parse_qty(raw):
    try:
        qty = int(raw)
    except ValueError as err:
        raise ValidationError("qty must be an integer") from err
    if qty <= 0:
        raise ValidationError("qty must be positive")
    return qty

for raw in ["3", "x"]:
    try:
        print("OK", parse_qty(raw))
    except ValidationError as err:
        print("FAIL", err)
`;
  }
  if (/generator|decorator|yield|context manager|itertools|functools|iterator/.test(tl)) {
    return py`
def timed(fn):
    def wrapper(*args):
        print("CALL", fn.__name__)
        return fn(*args)
    return wrapper

@timed
def double(n):
    return n * 2

print(double(5))
print(list(n for n in range(3)))
`;
  }
  if (/type hint|optional|union|typeddict|protocol|generic|mypy|type-safe|annotation/.test(tl)) {
    return py`
def find_price(catalog: dict, sku: str):
    return catalog.get(sku)

catalog = {"KB-01": 79.0}
print(find_price(catalog, "KB-01"))
print(find_price(catalog, "ZZ"))
`;
  }
  if (/json|csv|pathlib|file|config|env var|\.env|serializ/.test(tl)) {
    return py`
import json
raw = '{"env": "dev", "max_orders": 50}'
cfg = json.loads(raw)
cfg["env"] = "staging"
print(json.dumps(cfg))
`;
  }
  if (/repository|service layer|dto|architecture|layered|clean code|refactor|code smell/.test(tl)) {
    return py`
class Repo:
    def __init__(self):
        self.data = {}
    def save(self, key, value):
        self.data[key] = value
        return value

class Service:
    def __init__(self, repo):
        self.repo = repo
    def place(self, order_id, total):
        if total <= 0:
            raise ValueError("bad total")
        return self.repo.save(order_id, {"id": order_id, "total": total})

print(Service(Repo()).place("ORD-1", 40))
`;
  }
  if (/sql|join|crud|transaction|index|schema|migration|orm|sqlalchemy|alembic|query/.test(tl)) {
    return py`
customers = {1: {"name": "Asha"}, 2: {"name": "Ben"}}
orders = [{"id": 10, "customer_id": 1, "total": 99.0}]
for o in orders:
    print(o["id"], customers[o["customer_id"]]["name"], o["total"])
`;
  }
  if (/http|rest|status|endpoint|fastapi|router|openapi|pagination|idempoten/.test(tl)) {
    return py`
def handle(method, path):
    if method == "GET" and path == "/orders/1":
        return 200, {"id": "1"}
    if method == "POST" and path == "/orders":
        return 201, {"id": "2"}
    return 404, {"error": "not_found"}

print(handle("GET", "/orders/1"))
print(handle("GET", "/missing"))
`;
  }
  if (/auth|jwt|rbac|password|cors|oauth|security|owasp|threat/.test(tl)) {
    return py`
users = {"asha": {"role": "admin"}, "ben": {"role": "viewer"}}

def authorize(username, action):
    user = users.get(username)
    if not user:
        return False, "unknown"
    if action == "delete" and user["role"] != "admin":
        return False, "forbidden"
    return True, "ok"

print(authorize("asha", "delete"))
print(authorize("ben", "delete"))
`;
  }
  if (/pytest|unit test|mock|fixture|tdd|coverage|assert/.test(tl)) {
    return py`
def add(a, b):
    return a + b

assert add(2, 3) == 5
assert add(-1, 1) == 0
print("tests passed")
`;
  }
  if (/async|asyncio|thread|concurren|gil|future|multiprocess/.test(tl)) {
    return py`
import asyncio

async def fetch(name):
    await asyncio.sleep(0.01)
    return f"{name}-done"

async def main():
    print(await asyncio.gather(fetch("a"), fetch("b")))

asyncio.run(main())
`;
  }
  if (/performance|profil|cache|complexit|optim|generator/.test(tl) && m >= 24) {
    return py`
def sum_gen(n):
    return sum(i * i for i in range(n))

print(sum_gen(1000))
`;
  }
  if (/queue|celery|message|worker|retry|dlq|idempotent|event-driven|background/.test(tl)) {
    return py`
from collections import deque
q = deque([{"id": "ORD-1"}, {"id": "ORD-2"}])
seen = set()
while q:
    job = q.popleft()
    if job["id"] in seen:
        print("duplicate", job["id"])
        continue
    seen.add(job["id"])
    print("processed", job["id"])
`;
  }
  if (/docker|container|compose|dockerfile|12-factor|image/.test(tl)) {
    return py`
import os
os.environ["APP_ENV"] = "production"
os.environ["PORT"] = "8080"
print({"env": os.environ["APP_ENV"], "port": int(os.environ["PORT"])})
`;
  }
  if (/ci\/cd|pipeline|github actions|quality gate|lint|deploy|rollback/.test(tl)) {
    return py`
gates = [("lint", True), ("tests", True), ("typecheck", True)]
for name, ok in gates:
    print(("PASS" if ok else "FAIL"), name)
print("green?", all(ok for _, ok in gates))
`;
  }
  if (/kubernetes|k8s|pod|probe|replica|rolling|configmap|helm/.test(tl)) {
    return py`
app = {"alive": True, "ready": False}
print("liveness", 200 if app["alive"] else 500)
print("readiness", 200 if app["ready"] else 503)
app["ready"] = True
print("readiness", 200 if app["ready"] else 503)
`;
  }
  if (/observab|metric|trace|log|slo|sli|incident|monitor|opentelemetry|prometheus/.test(tl)) {
    return py`
import json
event = {"level": "INFO", "msg": "order_created", "correlation_id": "req-1", "order_id": "ORD-9"}
print(json.dumps(event))
`;
  }
  if (/secret|tls|graceful|readiness review|supply chain|redact/.test(tl)) {
    return py`
SECRET_KEYS = ("password", "api_key", "token")
cfg = {"host": "api", "password": "s3cret", "port": 443}
safe = {k: ("***" if k in SECRET_KEYS else v) for k, v in cfg.items()}
print(safe)
`;
  }
  if (/exercise —|capstone exercise|lab overview|lab tasks|lab architecture|lab review/.test(tl)) {
    return py`
# Hands-on slide: ${topic}
checklist = ["read prompt", "write code", "trace memory", "verify output"]
for i, step in enumerate(checklist, start=1):
    print(f"{i}. {step}")
print("Module ${m} practice ready")
`;
  }
  if (/knowledge check|module summary|learning objectives|assessment|feedback|retrospective|demonstration|presentation/.test(tl)) {
    return py`
slide = "${topic}"
module = ${m}
takeaways = ["concept", "example", "practice"]
print("Review:", slide)
print("Module", module)
for item in takeaways:
    print("-", item)
`;
  }

  // Default: concept drill tied to the slide title (still runnable in Pyodide)
  return py`
slide_title = "${topic}"
week = ${slide.week}
module = ${m}
print("Code Lab drill for:")
print(slide_title)
print(f"Week {week} · Module {module}")
notes = ["Read the slide", "Trace this program", "Say the idea in your own words"]
for n in notes:
    print("-", n)
`;
}

const slides = parseOutline(readFileSync(outlinePath, 'utf8'));
const weekTitles = new Map();
for (const s of slides) {
  if (!weekTitles.has(s.week)) weekTitles.set(s.week, s.weekTitle || `Week ${s.week}`);
}

const examples = slides.map((s) => {
  const id = `w${s.week}-m${s.module}-s${s.slide}`;
  const short = s.title.length > 60 ? `${s.title.slice(0, 57)}...` : s.title;
  return {
    id,
    week: s.week,
    module: s.module,
    moduleTitle: s.moduleTitle,
    slide: s.slide,
    exercise: s.slide,
    title: `M${s.module} · S${s.slide} · ${short}`,
    slideTitle: s.title,
    description: `Week ${s.week} · Module ${s.module}: ${s.moduleTitle} — Slide: ${s.title}`,
    code: codeForSlide(s),
  };
});

const weekMeta = [...weekTitles.entries()]
  .sort((a, b) => a[0] - b[0])
  .map(([week, title]) => `  { week: ${week}, title: ${JSON.stringify(title)} },`)
  .join('\n');

const body = examples
  .map(
    (ex) => `  {
    id: ${JSON.stringify(ex.id)},
    week: ${ex.week},
    module: ${ex.module},
    moduleTitle: ${JSON.stringify(ex.moduleTitle)},
    slide: ${ex.slide},
    exercise: ${ex.exercise},
    title: ${JSON.stringify(ex.title)},
    slideTitle: ${JSON.stringify(ex.slideTitle)},
    description: ${JSON.stringify(ex.description)},
    code: ${JSON.stringify(ex.code)},
  }`,
  )
  .join(',\n');

const out = `/**
 * Python Visual Code Lab — one exercise per slide in slides_outline.md
 * Generated by scripts/generate-lab-examples-from-slides.mjs
 * Source: curriculum/python-software-engineer-bootcamp/slides_outline.md
 */

/** @typedef {{ id: string, week: number, module: number, moduleTitle: string, slide: number, exercise: number, title: string, slideTitle: string, description: string, code: string }} LabExample */

/** @type {LabExample[]} */
export const pythonExamples = [
${body}
];

export const BOOTCAMP_LAB_WEEKS = [
${weekMeta}
];

/** Kept for any legacy Java lab references; product UI is Python-only. */
export const javaExamples = [
  {
    id: 'hello',
    title: 'Hello & Variables',
    description: 'Declare int and String variables — watch memory boxes.',
    code: \`// Beginner Java dry-run (subset)
int age = 18;
String name = "ComputerGeek";
System.out.println("Hello, " + name);
System.out.println("Age: " + age);
\`,
  },
];
`;

const target = join(root, 'src/data/labExamples.js');
writeFileSync(target, out, 'utf8');
console.log(`Wrote ${examples.length} slide exercises -> ${target}`);
