/**
 * Python Visual Code Lab examples aligned to the
 * Python Software Engineer Bootcamp (8 weeks / 32 modules).
 *
 * All snippets run in-browser via Pyodide (no FastAPI/Docker/Postgres installs).
 * Later weeks use educational simulations of enterprise concepts.
 */

/** @typedef {{ id: string, week: number, module: number, title: string, description: string, code: string }} LabExample */

/** @type {LabExample[]} */
export const pythonExamples = [
  // ─── Week 1 · Python Foundations ─────────────────────────────────────────
  {
    id: 'w1-m1-cli',
    week: 1,
    module: 1,
    title: 'Hello & Variables',
    description:
      'Week 1 · Module 1 — First program: variables in memory and print output (Dev environment & CLI app).',
    code: `# Module 1: Python fundamentals — values live in named memory boxes
name = "ComputerGeek"
age = 18
print("Hello,", name)
print("Age:", age)
`,
  },
  {
    id: 'w1-m2-types',
    week: 1,
    module: 2,
    title: 'M2 · Types & operators',
    description:
      'Week 1 · Module 2 — Numbers, strings, bool, None, and conversions (Typed data-processing utility).',
    code: `# Module 2: Variables, data types & operators
price = 19.99
qty = 3
tax_rate = 0.13
subtotal = price * qty
tax = round(subtotal * tax_rate, 2)
total = subtotal + tax
in_stock = qty > 0
label = str(qty) + " items"
print("Subtotal:", subtotal)
print("Tax:", tax)
print("Total:", total)
print("In stock?", in_stock, "|", label)
`,
  },
  {
    id: 'w1-m3-flow',
    week: 1,
    module: 3,
    title: 'M3 · Control flow',
    description:
      'Week 1 · Module 3 — if/elif/else and loops for a rule-based transaction processor.',
    code: `# Module 3: Control flow — rule-based transactions
transactions = [25, 120, -10, 80]
approved = 0
rejected = 0

for amount in transactions:
    if amount <= 0:
        status = "REJECT"
        rejected = rejected + 1
    elif amount > 100:
        status = "REVIEW"
        rejected = rejected + 1
    else:
        status = "APPROVE"
        approved = approved + 1
    print("Amount", amount, "->", status)

print("Approved:", approved, "Rejected/Review:", rejected)
`,
  },
  {
    id: 'w1-m4-collections',
    week: 1,
    module: 4,
    title: 'M4 · Collections inventory',
    description:
      'Week 1 · Module 4 — Lists and dicts for an in-memory inventory system.',
    code: `# Module 4: Python collections — in-memory inventory
inventory = {"keyboard": 12, "mouse": 30, "monitor": 5}
sold = ["mouse", "keyboard", "mouse"]

for item in sold:
    inventory[item] = inventory[item] - 1

low_stock = [name for name, qty in inventory.items() if qty < 10]
print("Inventory:", inventory)
print("Low stock:", low_stock)
print("SKUs:", list(inventory.keys()))
`,
  },
  {
    id: 'w1-swap',
    week: 1,
    module: 2,
    title: 'Swap two numbers',
    description: 'Week 1 drill — watch values move between variables step by step.',
    code: `# Dry-run drill: swap using a temporary variable
a = 10
b = 25
print("Before:", a, b)

temp = a
a = b
b = temp

print("After:", a, b)
`,
  },

  // ─── Week 2 · Functions, OOP & Professional Python ────────────────────────
  {
    id: 'w2-m5-functions',
    week: 2,
    module: 5,
    title: 'M5 · Reusable functions',
    description:
      'Week 2 · Module 5 — Parameters, returns, and pure helpers (Reusable business functions).',
    code: `# Module 5: Functions & functional concepts
def line_total(price, qty, tax_rate=0.13):
    subtotal = price * qty
    return round(subtotal * (1 + tax_rate), 2)

def discount(total, percent):
    return round(total * (1 - percent / 100), 2)

cart = line_total(49.99, 2)
final = discount(cart, 10)
print("Cart:", cart)
print("After 10% off:", final)
`,
  },
  {
    id: 'w2-m6-modules',
    week: 2,
    module: 6,
    title: 'M6 · Import & helpers',
    description:
      'Week 2 · Module 6 — Using the standard library like a small package (Professional Python package).',
    code: `# Module 6: Modules — reuse stdlib helpers (package thinking)
from math import ceil
from collections import Counter

orders = ["A-100", "A-100", "B-200", "A-100"]
counts = Counter(orders)
boxes_needed = ceil(sum(counts.values()) / 3)

print("Order counts:", dict(counts))
print("Boxes to pack (3/order):", boxes_needed)
`,
  },
  {
    id: 'w2-m7-oop',
    week: 2,
    module: 7,
    title: 'M7 · OOP orders',
    description:
      'Week 2 · Module 7 — Classes and composition for an OO order management system.',
    code: `# Module 7: Object-oriented order management
class Product:
    def __init__(self, sku, price):
        self.sku = sku
        self.price = price

class Order:
    def __init__(self, order_id):
        self.order_id = order_id
        self.lines = []

    def add(self, product, qty):
        self.lines.append((product, qty))

    def total(self):
        return sum(p.price * q for p, q in self.lines)

keyboard = Product("KB-01", 79.0)
order = Order("ORD-9")
order.add(keyboard, 2)
print(order.order_id, "total =", order.total())
print("Lines:", len(order.lines))
`,
  },
  {
    id: 'w2-m8-exceptions',
    week: 2,
    module: 8,
    title: 'M8 · Exceptions & logging',
    description:
      'Week 2 · Module 8 — Validation, custom errors, and defensive checks.',
    code: `# Module 8: Exceptions & defensive programming
class ValidationError(Exception):
    pass

def parse_qty(raw):
    try:
        qty = int(raw)
    except ValueError:
        raise ValidationError("qty must be an integer")
    if qty <= 0:
        raise ValidationError("qty must be positive")
    return qty

for raw in ["3", "abc", "-1"]:
    try:
        q = parse_qty(raw)
        print("OK:", raw, "->", q)
    except ValidationError as err:
        print("FAIL:", raw, "->", err)
`,
  },

  // ─── Week 3 · Advanced Python & Engineering Practices ─────────────────────
  {
    id: 'w3-m9-generators',
    week: 3,
    module: 9,
    title: 'M9 · Generators & decorators',
    description:
      'Week 3 · Module 9 — Streaming processors and a simple timing decorator.',
    code: `# Module 9: Generators & decorators
def timed(fn):
    def wrapper(*args):
        print("CALL", fn.__name__)
        return fn(*args)
    return wrapper

def order_ids(start, count):
    n = start
    for _ in range(count):
        yield f"ORD-{n}"
        n = n + 1

@timed
def list_batch(start, count):
    return list(order_ids(start, count))

print(list_batch(100, 3))
`,
  },
  {
    id: 'w3-m10-typing',
    week: 3,
    module: 10,
    title: 'M10 · Type-safe helpers',
    description:
      'Week 3 · Module 10 — Type hints on business helpers (static checkers in class; runtime here).',
    code: `# Module 10: Type-safe Python (hints guide readers & tools)
from typing import Optional

def find_price(catalog: dict[str, float], sku: str) -> Optional[float]:
    return catalog.get(sku)

catalog: dict[str, float] = {"KB-01": 79.0, "MS-02": 29.5}
print("KB-01:", find_price(catalog, "KB-01"))
print("ZZ-99:", find_price(catalog, "ZZ-99"))
`,
  },
  {
    id: 'w3-m11-json-config',
    week: 3,
    module: 11,
    title: 'M11 · JSON config',
    description:
      'Week 3 · Module 11 — Serialization and configuration loading (file-processing service).',
    code: `# Module 11: Files / serialization — JSON config in memory
import json

raw = '{"env": "dev", "max_orders": 50, "features": {"cache": true}}'
config = json.loads(raw)
config["env"] = "staging"
export = json.dumps(config, indent=2)
print(export)
print("Max orders:", config["max_orders"])
`,
  },
  {
    id: 'w3-m12-layers',
    week: 3,
    module: 12,
    title: 'M12 · Layered architecture',
    description:
      'Week 3 · Module 12 — Repository + service layers (Clean Code & architecture).',
    code: `# Module 12: Layered architecture — repository / service
class OrderRepo:
    def __init__(self):
        self._rows = {}

    def save(self, order_id, total):
        self._rows[order_id] = total

    def get(self, order_id):
        return self._rows.get(order_id)

class OrderService:
    def __init__(self, repo):
        self.repo = repo

    def place(self, order_id, total):
        if total <= 0:
            raise ValueError("total must be positive")
        self.repo.save(order_id, total)
        return {"id": order_id, "total": total, "status": "PLACED"}

repo = OrderRepo()
svc = OrderService(repo)
print(svc.place("ORD-1", 120.5))
print("Stored:", repo.get("ORD-1"))
`,
  },

  // ─── Week 4 · Databases & Persistence (simulated) ─────────────────────────
  {
    id: 'w4-m13-schema',
    week: 4,
    module: 13,
    title: 'M13 · Schema as tables',
    description:
      'Week 4 · Module 13 — Model tables/keys with dicts (Enterprise schema design).',
    code: `# Module 13: SQL thinking — tables as dict collections
customers = {
    1: {"name": "Asha", "city": "Toronto"},
    2: {"name": "Ben", "city": "Montreal"},
}
orders = [
    {"id": 10, "customer_id": 1, "total": 99.0},
    {"id": 11, "customer_id": 1, "total": 40.0},
    {"id": 12, "customer_id": 2, "total": 15.0},
]

# JOIN customers ↔ orders (conceptual)
for o in orders:
    c = customers[o["customer_id"]]
    print(o["id"], c["name"], c["city"], o["total"])
`,
  },
  {
    id: 'w4-m14-safe-sql',
    week: 4,
    module: 14,
    title: 'M14 · Safe queries',
    description:
      'Week 4 · Module 14 — Parameterized lookup (SQL injection prevention mindset).',
    code: `# Module 14: Safe parameterized access (DB-API mindset)
inventory = [
    {"sku": "KB-01", "qty": 12},
    {"sku": "MS-02", "qty": 30},
]

def find_by_sku(rows, sku):
    # Never concatenate user input into a raw query string
    for row in rows:
        if row["sku"] == sku:
            return row
    return None

user_sku = "MS-02"
print(find_by_sku(inventory, user_sku))
print(find_by_sku(inventory, "HACK' OR 1=1"))
`,
  },
  {
    id: 'w4-m15-orm',
    week: 4,
    module: 15,
    title: 'M15 · Mini ORM model',
    description:
      'Week 4 · Module 15 — Object ↔ row mapping like SQLAlchemy models.',
    code: `# Module 15: ORM-style model + simple session
class Product:
    def __init__(self, id, sku, price):
        self.id = id
        self.sku = sku
        self.price = price

class Session:
    def __init__(self):
        self.identity_map = {}

    def add(self, obj):
        self.identity_map[obj.id] = obj

    def get(self, id):
        return self.identity_map.get(id)

session = Session()
session.add(Product(1, "KB-01", 79.0))
session.add(Product(2, "MS-02", 29.5))
p = session.get(1)
print(p.sku, p.price)
print("Tracked rows:", len(session.identity_map))
`,
  },
  {
    id: 'w4-m16-migrate',
    week: 4,
    module: 16,
    title: 'M16 · Migration versions',
    description:
      'Week 4 · Module 16 — Versioned schema changes (Alembic-style thinking).',
    code: `# Module 16: Versioned migrations (educational)
schema = {"version": 1, "columns": ["id", "sku", "qty"]}
migrations = [
    {"to": 2, "add": "price"},
    {"to": 3, "add": "updated_at"},
]

for step in migrations:
    schema["columns"].append(step["add"])
    schema["version"] = step["to"]
    print("Migrated to v", schema["version"], "->", schema["columns"])
`,
  },

  // ─── Week 5 · Enterprise REST API (simulated) ─────────────────────────────
  {
    id: 'w5-m17-rest',
    week: 5,
    module: 17,
    title: 'M17 · REST contract',
    description:
      'Week 5 · Module 17 — Resources, methods, and status codes (API contract design).',
    code: `# Module 17: HTTP & REST fundamentals
def response(status, body):
    return {"status": status, "body": body}

orders = {"1": {"id": "1", "total": 50}}

def handle(method, path):
    if method == "GET" and path == "/orders/1":
        return response(200, orders["1"])
    if method == "POST" and path == "/orders":
        return response(201, {"id": "2", "total": 0})
    return response(404, {"error": "not_found"})

print(handle("GET", "/orders/1"))
print(handle("POST", "/orders"))
print(handle("GET", "/orders/9"))
`,
  },
  {
    id: 'w5-m18-fastapi-style',
    week: 5,
    module: 18,
    title: 'M18 · FastAPI-style CRUD',
    description:
      'Week 5 · Module 18 — Route handlers + validation (FastAPI CRUD concepts in pure Python).',
    code: `# Module 18: FastAPI-style handlers (no server — logic only)
store = {}

def create_item(item_id, name, price):
    if price < 0:
        return {"error": "price must be >= 0"}, 422
    store[item_id] = {"id": item_id, "name": name, "price": price}
    return store[item_id], 201

def get_item(item_id):
    item = store.get(item_id)
    if not item:
        return {"error": "not found"}, 404
    return item, 200

body, code = create_item("p1", "Keyboard", 79)
print(code, body)
print(get_item("p1"))
print(get_item("missing"))
`,
  },
  {
    id: 'w5-m19-layers-api',
    week: 5,
    module: 19,
    title: 'M19 · API layers',
    description:
      'Week 5 · Module 19 — Router → service → repository (Enterprise API architecture).',
    code: `# Module 19: Enterprise API layers
class Repo:
    def __init__(self):
        self.data = {}
    def save(self, key, value):
        self.data[key] = value
        return value

class Service:
    def __init__(self, repo):
        self.repo = repo
    def create_order(self, order_id, total):
        return self.repo.save(order_id, {"id": order_id, "total": total, "status": "NEW"})

def router_post_orders(service, order_id, total):
    order = service.create_order(order_id, total)
    return {"status": 201, "data": order}

svc = Service(Repo())
print(router_post_orders(svc, "ORD-42", 88.0))
`,
  },
  {
    id: 'w5-m20-rbac',
    week: 5,
    module: 20,
    title: 'M20 · Auth & RBAC',
    description:
      'Week 5 · Module 20 — Roles and authorization checks (Secure API with RBAC).',
    code: `# Module 20: Authentication & RBAC (simplified)
users = {
    "asha": {"role": "admin"},
    "ben": {"role": "viewer"},
}

def authorize(username, action):
    user = users.get(username)
    if not user:
        return False, "unknown user"
    if action == "delete_order" and user["role"] != "admin":
        return False, "forbidden"
    return True, "ok"

for who in ["asha", "ben", "zoe"]:
    ok, msg = authorize(who, "delete_order")
    print(who, "->", ok, msg)
`,
  },

  // ─── Week 6 · Testing, Concurrency & Performance ──────────────────────────
  {
    id: 'w6-m21-pytest-style',
    week: 6,
    module: 21,
    title: 'M21 · Assert tests',
    description:
      'Week 6 · Module 21 — Unit-test style assertions (pytest mindset in the lab).',
    code: `# Module 21: Automated testing mindset
def add(a, b):
    return a + b

def run_tests():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    print("All tests passed")

run_tests()
`,
  },
  {
    id: 'w6-m22-tdd',
    week: 6,
    module: 22,
    title: 'M22 · TDD red-green',
    description:
      'Week 6 · Module 22 — Write the failing expectation, then make it pass.',
    code: `# Module 22: TDD — Red → Green (simplified)
def qualifies_for_free_shipping(total, member):
    # Green: implement the rule after the test below
    return member and total >= 50

# Tests first (would fail before implementation)
assert qualifies_for_free_shipping(60, True) is True
assert qualifies_for_free_shipping(60, False) is False
assert qualifies_for_free_shipping(20, True) is False
print("TDD checks green")
`,
  },
  {
    id: 'w6-m23-async',
    week: 6,
    module: 23,
    title: 'M23 · Async gather',
    description:
      'Week 6 · Module 23 — asyncio concurrent tasks (Async workflow).',
    code: `# Module 23: Concurrency & asyncio
import asyncio

async def fetch(name, delay):
    await asyncio.sleep(delay)
    return f"{name}-done"

async def main():
    results = await asyncio.gather(
        fetch("inventory", 0.01),
        fetch("pricing", 0.01),
        fetch("tax", 0.01),
    )
    print(results)

asyncio.run(main())
`,
  },
  {
    id: 'w6-m24-perf',
    week: 6,
    module: 24,
    title: 'M24 · Profile mindset',
    description:
      'Week 6 · Module 24 — Generators vs building huge lists (Performance engineering).',
    code: `# Module 24: Performance — prefer streaming when possible
def sum_squares_list(n):
    nums = [i * i for i in range(n)]
    return sum(nums)

def sum_squares_gen(n):
    return sum(i * i for i in range(n))

n = 1000
a = sum_squares_list(n)
b = sum_squares_gen(n)
print("list sum:", a)
print("gen sum:", b)
print("same?", a == b)
`,
  },

  // ─── Week 7 · Distributed Systems (simulated) ─────────────────────────────
  {
    id: 'w7-m25-queue',
    week: 7,
    module: 25,
    title: 'M25 · Task queue',
    description:
      'Week 7 · Module 25 — Background order processing with a simple queue.',
    code: `# Module 25: Background processing & messaging
from collections import deque

queue = deque()
queue.append({"type": "ORDER_PLACED", "id": "ORD-1"})
queue.append({"type": "ORDER_PLACED", "id": "ORD-2"})

processed = []
while queue:
    job = queue.popleft()
    processed.append(job["id"])
    print("Worker handled", job)

print("Done:", processed)
`,
  },
  {
    id: 'w7-m26-cache',
    week: 7,
    module: 26,
    title: 'M26 · Cache-aside',
    description:
      'Week 7 · Module 26 — TTL-style cache and resilience fallback.',
    code: `# Module 26: Caching & resilience
cache = {}
db = {"KB-01": 79.0}

def get_price(sku):
    if sku in cache:
        print("cache hit", sku)
        return cache[sku]
    print("cache miss", sku)
    if sku not in db:
        return None
    cache[sku] = db[sku]
    return cache[sku]

print(get_price("KB-01"))
print(get_price("KB-01"))
print(get_price("ZZ-99"))
`,
  },
  {
    id: 'w7-m27-docker-config',
    week: 7,
    module: 27,
    title: 'M27 · 12-factor config',
    description:
      'Week 7 · Module 27 — Env-based config like containers use (Docker concepts).',
    code: `# Module 27: Container-friendly configuration
import os

# Simulate environment injected into a container
os.environ["APP_ENV"] = "production"
os.environ["PORT"] = "8080"

def load_settings():
    return {
        "env": os.environ.get("APP_ENV", "dev"),
        "port": int(os.environ.get("PORT", "3000")),
    }

print(load_settings())
`,
  },
  {
    id: 'w7-m28-ci-gates',
    week: 7,
    module: 28,
    title: 'M28 · CI quality gates',
    description:
      'Week 7 · Module 28 — Lint/test/type gates as a tiny pipeline checklist.',
    code: `# Module 28: CI/CD quality gates (conceptual)
def run_gate(name, ok):
    status = "PASS" if ok else "FAIL"
    print(f"[{status}] {name}")
    return ok

results = [
    run_gate("lint", True),
    run_gate("unit-tests", True),
    run_gate("typecheck", True),
]
print("Pipeline green?" , all(results))
`,
  },

  // ─── Week 8 · Enterprise Production Engineering ───────────────────────────
  {
    id: 'w8-m29-k8s-health',
    week: 8,
    module: 29,
    title: 'M29 · Health probes',
    description:
      'Week 8 · Module 29 — Liveness/readiness style checks (Kubernetes fundamentals).',
    code: `# Module 29: Cloud / K8s — health probes
app = {"ready": False, "alive": True}

def liveness():
    return 200 if app["alive"] else 500

def readiness():
    return 200 if app["ready"] else 503

print("live", liveness(), "ready", readiness())
app["ready"] = True
print("live", liveness(), "ready", readiness())
`,
  },
  {
    id: 'w8-m30-observability',
    week: 8,
    module: 30,
    title: 'M30 · Structured logs',
    description:
      'Week 8 · Module 30 — Correlation IDs and structured logging (Observability).',
    code: `# Module 30: Observability — structured logs + correlation id
import json

def log_event(level, message, correlation_id, **fields):
    payload = {
        "level": level,
        "msg": message,
        "correlation_id": correlation_id,
        **fields,
    }
    print(json.dumps(payload))

cid = "req-7f3a"
log_event("INFO", "order_created", cid, order_id="ORD-9", total=120)
log_event("ERROR", "payment_failed", cid, reason="card_declined")
`,
  },
  {
    id: 'w8-m31-security',
    week: 8,
    module: 31,
    title: 'M31 · Security checks',
    description:
      'Week 8 · Module 31 — Secrets hygiene and input validation (Production security).',
    code: `# Module 31: Production security & reliability checks
SECRET_KEYS = ("password", "api_key", "token")

def redact(config):
    safe = {}
    for k, v in config.items():
        safe[k] = "***" if k in SECRET_KEYS else v
    return safe

cfg = {"host": "api.local", "password": "s3cret", "api_key": "abc", "port": 443}
print(redact(cfg))

def is_safe_sku(sku):
    return sku.isalnum() or "-" in sku

print("KB-01 safe?", is_safe_sku("KB-01"))
print("evil safe?", is_safe_sku("x; DROP TABLE"))
`,
  },
  {
    id: 'w8-m32-architecture',
    week: 8,
    module: 32,
    title: 'M32 · Architecture review',
    description:
      'Week 8 · Module 32 — Tiny ADR-style checklist against the bootcamp app shape.',
    code: `# Module 32: Enterprise architecture review checklist
checklist = {
    "layered_api": True,
    "auth_present": True,
    "tests_exist": True,
    "observability": True,
    "migrations": True,
}

failed = [name for name, ok in checklist.items() if not ok]
print("Checks:", checklist)
print("Ready for production review?" , len(failed) == 0)
print("Failed items:", failed)
`,
  },
];

export const BOOTCAMP_LAB_WEEKS = [
  { week: 1, title: 'Python Foundations' },
  { week: 2, title: 'Functions, OOP & Professional Python' },
  { week: 3, title: 'Advanced Python & Engineering' },
  { week: 4, title: 'Databases & Persistence' },
  { week: 5, title: 'Enterprise REST APIs' },
  { week: 6, title: 'Testing, Concurrency & Performance' },
  { week: 7, title: 'Distributed Systems & Infra' },
  { week: 8, title: 'Production Engineering' },
];

/** Kept for any legacy Java lab references; product UI is Python-only. */
export const javaExamples = [
  {
    id: 'hello',
    title: 'Hello & Variables',
    description: 'Declare int and String variables — watch memory boxes.',
    code: `// Beginner Java dry-run (subset)
int age = 18;
String name = "ComputerGeek";
System.out.println("Hello, " + name);
System.out.println("Age: " + age);
`,
  },
];
