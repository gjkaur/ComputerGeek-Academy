/**
 * Generates Code Lab exercises: 5 per module title from the bootcamp outline.
 * Run: node scripts/generate-lab-examples.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {Array<{week:number,title:string,modules:Array<{n:number,title:string,exercises:Array<[string,string,string]>}>}>} */
const OUTLINE = [
  {
    week: 1,
    title: 'Python Foundations',
    modules: [
      {
        n: 1,
        title: 'Python & Software Development Fundamentals',
        exercises: [
          ['Interactive greeting', 'First program: variables + print', 'name = "Alex"\nage = 22\nprint("Hello,", name)\nprint("Welcome to ComputerGeek Academy")\nprint("Age:", age)\n'],
          ['Comments & documentation', 'Comments explain intent', '# CLI greeting — Module 1\n# Author: student\nmessage = "Ready to code"\nprint(message)  # show on screen\n'],
          ['Compose a full name', 'String join without blocking input()', 'first = "Sam"\nlast = "Lee"\nfull = first + " " + last\nprint("Hello,", full)\n'],
          ['Convert safely', 'int conversion after a valid string', 'value = "42"\nnumber = int(value)\nprint("Converted:", number)\nprint("Type:", type(number).__name__)\n'],
          ['PEP 8 style names', 'Readable names and a summary line', 'student_name = "Jordan"\ncourse_name = "Python Bootcamp"\nis_enrolled = True\nprint(student_name, "|", course_name, "|", is_enrolled)\n'],
        ],
      },
      {
        n: 2,
        title: 'Variables, Data Types & Operators',
        exercises: [
          ['Price & tax calculator', 'Arithmetic operators for money', 'price = 49.99\nqty = 2\ntax_rate = 0.13\nsubtotal = price * qty\ntax = round(subtotal * tax_rate, 2)\ntotal = subtotal + tax\nprint("Subtotal:", subtotal)\nprint("Tax:", tax)\nprint("Total:", total)\n'],
          ['Inspect and convert types', 'type() plus float/int conversion', 'raw = "19.5"\nprice = float(raw)\nqty = int("3")\nprint(type(raw).__name__, type(price).__name__, type(qty).__name__)\nprint("Line total:", price * qty)\n'],
          ['Comparisons & booleans', 'Comparison and logical operators', 'score = 82\npassed = score >= 70\nhonors = score >= 90\nprint("Passed:", passed)\nprint("Honors:", honors)\nprint("Retake:", not passed)\n'],
          ['f-string formatting', 'Modern string formatting', 'item = "Keyboard"\nprice = 79.0\nprint(f"{item} costs CA${price:.2f}")\nprint(f"Discounted: CA${price * 0.9:.2f}")\n'],
          ['Mutation vs rebinding', 'List change vs int reassignment', 'count = 1\ncount = count + 1\ntags = ["python"]\ntags.append("bootcamp")\nprint("count:", count)\nprint("tags:", tags)\n'],
        ],
      },
      {
        n: 3,
        title: 'Control Flow',
        exercises: [
          ['Access decision engine', 'if / elif / else by role', 'role = "editor"\nif role == "admin":\n    access = "full"\nelif role == "editor":\n    access = "write"\nelse:\n    access = "read"\nprint("Role:", role, "->", access)\n'],
          ['Batch transactions', 'Loop with approve/review/reject rules', 'amounts = [25, 150, -5, 80]\nfor amount in amounts:\n    if amount <= 0:\n        status = "REJECT"\n    elif amount > 100:\n        status = "REVIEW"\n    else:\n        status = "APPROVE"\n    print(amount, status)\n'],
          ['Range counter', 'for + range accumulation', 'total = 0\nfor i in range(1, 6):\n    total = total + i\n    print("i", i, "total", total)\nprint("Sum:", total)\n'],
          ['break and continue', 'Skip and stop a loop', 'codes = ["OK", "SKIP", "OK", "STOP", "OK"]\nfor code in codes:\n    if code == "SKIP":\n        continue\n    if code == "STOP":\n        break\n    print("process", code)\nprint("done")\n'],
          ['Compound conditions', 'and / or decision ladder', 'tier = "gold"\npoints = 120\nif tier == "gold" and points >= 100:\n    reward = "free_shipping"\nelif tier == "silver":\n    reward = "5_percent"\nelse:\n    reward = "none"\nprint(reward)\n'],
        ],
      },
      {
        n: 4,
        title: 'Python Collections',
        exercises: [
          ['Model an order', 'Dict for customer order data', 'order = {"id": "ORD-1", "items": ["KB", "MS"], "total": 108.5}\nprint(order["id"])\nprint("Items:", len(order["items"]))\nprint("Total:", order["total"])\n'],
          ['Inventory list ops', 'Append, index, slice', 'skus = ["KB-01", "MS-02", "MN-03"]\nskus.append("HP-04")\nprint(skus[0], skus[-1])\nprint("First two:", skus[:2])\n'],
          ['Unique with set', 'Deduplicate visits', 'visits = ["A", "B", "A", "C", "B"]\nunique = set(visits)\nprint("Visits:", len(visits))\nprint("Unique:", sorted(unique))\n'],
          ['Comprehension transform', 'List comprehension with tax', 'prices = [10, 20, 30]\nwith_tax = [round(p * 1.13, 2) for p in prices]\nprint(with_tax)\n'],
          ['enumerate + zip', 'Pair names and roles', 'names = ["Asha", "Ben"]\nroles = ["admin", "viewer"]\nfor i, (name, role) in enumerate(zip(names, roles), start=1):\n    print(i, name, role)\n'],
        ],
      },
    ],
  },
  {
    week: 2,
    title: 'Functions, OOP & Professional Python',
    modules: [
      {
        n: 5,
        title: 'Functions & Functional Concepts',
        exercises: [
          ['Reusable pricing function', 'def + return', 'def line_total(price, qty):\n    return round(price * qty, 2)\n\nprint(line_total(19.99, 3))\nprint(line_total(5, 10))\n'],
          ['Defaults & keywords', 'Default and keyword arguments', 'def greet(name, title="Student"):\n    return f"{title} {name}"\n\nprint(greet("Alex"))\nprint(greet("Alex", title="Learner"))\n'],
          ['*args packing', 'Variable positional args', 'def sum_all(*nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total\n\nprint(sum_all(1, 2, 3, 4))\n'],
          ['Pure discount helper', 'Same input → same output', 'def discount(total, percent):\n    return round(total * (1 - percent / 100), 2)\n\nprint(discount(100, 10))\nprint(discount(100, 10))\n'],
          ['Lambda sort key', 'sorted with lambda', 'products = [{"sku": "B", "price": 30}, {"sku": "A", "price": 10}]\nordered = sorted(products, key=lambda p: p["price"])\nprint(ordered)\n'],
        ],
      },
      {
        n: 6,
        title: 'Modules, Packages & Dependency Management',
        exercises: [
          ['Import stdlib helpers', 'math + Counter', 'from math import ceil\nfrom collections import Counter\nprint(ceil(9.1))\nprint(dict(Counter(["a", "a", "b"])))\n'],
          ['Mini helper module', 'Reusable normalize function', 'def normalize_sku(sku):\n    return sku.strip().upper()\n\nprint(normalize_sku(" kb-01 "))\n'],
          ['__name__ entrypoint', 'Main-guard pattern', 'def main():\n    print("app start")\n    return 0\n\nif __name__ == "__main__":\n    code = main()\n    print("exit", code)\n'],
          ['Module constants', 'App name and version', 'APP_NAME = "order-service"\nVERSION = "1.0.0"\nprint(APP_NAME + "@" + VERSION)\n'],
          ['Pinned dependencies map', 'Lockfile-style dict', 'locks = {"fastapi": "0.115.0", "pydantic": "2.9.0"}\nfor pkg, ver in locks.items():\n    print(f"{pkg}=={ver}")\n'],
        ],
      },
      {
        n: 7,
        title: 'Object-Oriented Programming',
        exercises: [
          ['Customer class', 'Class + attributes', 'class Customer:\n    def __init__(self, name):\n        self.name = name\n\nc = Customer("Asha")\nprint(c.name)\n'],
          ['Order methods', 'Add lines and count', 'class Order:\n    def __init__(self, order_id):\n        self.order_id = order_id\n        self.lines = []\n    def add(self, sku, qty):\n        self.lines.append((sku, qty))\n    def count(self):\n        return len(self.lines)\n\no = Order("ORD-1")\no.add("KB", 2)\nprint(o.order_id, o.count())\n'],
          ['Composition cart', 'Cart owns products', 'class Product:\n    def __init__(self, sku, price):\n        self.sku = sku\n        self.price = price\n\nclass Cart:\n    def __init__(self):\n        self.items = []\n    def add(self, product, qty):\n        self.items.append((product, qty))\n    def total(self):\n        return sum(p.price * q for p, q in self.items)\n\ncart = Cart()\ncart.add(Product("KB", 79), 1)\nprint(cart.total())\n'],
          ['Inheritance roles', 'Subclass overrides method', 'class User:\n    def role(self):\n        return "user"\n\nclass Admin(User):\n    def role(self):\n        return "admin"\n\nprint(User().role(), Admin().role())\n'],
          ['Money value object', 'Simple data holder', 'class Money:\n    def __init__(self, amount, currency="CAD"):\n        self.amount = amount\n        self.currency = currency\n    def __repr__(self):\n        return f"{self.currency} {self.amount}"\n\nprint(Money(99.5))\n'],
        ],
      },
      {
        n: 8,
        title: 'Exceptions, Logging & Defensive Programming',
        exercises: [
          ['try / except', 'Catch ValueError', 'raw = "abc"\ntry:\n    n = int(raw)\nexcept ValueError:\n    n = 0\n    print("invalid int")\nprint("n=", n)\n'],
          ['Custom exception', 'Domain OrderError', 'class OrderError(Exception):\n    pass\n\ndef place(total):\n    if total <= 0:\n        raise OrderError("total must be positive")\n    return "OK"\n\ntry:\n    print(place(-1))\nexcept OrderError as e:\n    print("blocked:", e)\n'],
          ['else / finally', 'Full try shape', 'ok = False\ntry:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    print("div0")\nelse:\n    ok = True\n    print("result", x)\nfinally:\n    print("cleanup", ok)\n'],
          ['Fail-fast validation', 'Guard clause', 'def require_sku(sku):\n    if not sku:\n        raise ValueError("sku required")\n    return sku.upper()\n\nprint(require_sku("kb-01"))\n'],
          ['Structured log event', 'Dict log line', 'event = {"level": "INFO", "msg": "order_created", "order_id": "ORD-9"}\nprint(event)\n'],
        ],
      },
    ],
  },
  {
    week: 3,
    title: 'Advanced Python & Engineering Practices',
    modules: [
      {
        n: 9,
        title: 'Advanced Python Language Features',
        exercises: [
          ['Generator stream', 'yield order ids', 'def order_ids(start, count):\n    n = start\n    for _ in range(count):\n        yield f"ORD-{n}"\n        n += 1\n\nprint(list(order_ids(100, 3)))\n'],
          ['Timing decorator', 'Wrapper that logs calls', 'def timed(fn):\n    def wrapper(*args):\n        print("CALL", fn.__name__)\n        return fn(*args)\n    return wrapper\n\n@timed\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))\n'],
          ['Context-manager style', 'Manual enter/exit pattern', 'class DemoCM:\n    def __enter__(self):\n        print("enter")\n        return self\n    def __exit__(self, *args):\n        print("exit")\n\nwith DemoCM() as cm:\n    print("inside", type(cm).__name__)\n'],
          ['itertools-style recipe', 'pairwise with zip', 'nums = [1, 2, 3, 4]\npairs = list(zip(nums, nums[1:]))\nprint(pairs)\n'],
          ['Advanced comprehension', 'Dict from pairs', 'pairs = [("a", 1), ("b", 2)]\nlookup = {k: v for k, v in pairs}\nprint(lookup)\n'],
        ],
      },
      {
        n: 10,
        title: 'Type-Safe Python',
        exercises: [
          ['Annotated helper', 'Type hints on params/return', 'def find_price(catalog: dict, sku: str):\n    return catalog.get(sku)\n\ncatalog = {"KB-01": 79.0}\nprint(find_price(catalog, "KB-01"))\nprint(find_price(catalog, "ZZ"))\n'],
          ['Optional style', 'None when missing', 'def first_or_none(items):\n    if not items:\n        return None\n    return items[0]\n\nprint(first_or_none([10, 20]))\nprint(first_or_none([]))\n'],
          ['Literal-like status', 'Constrained string values', 'ALLOWED = {"NEW", "PAID", "SHIPPED"}\n\ndef set_status(status):\n    if status not in ALLOWED:\n        raise ValueError("bad status")\n    return status\n\nprint(set_status("PAID"))\n'],
          ['TypedDict-style map', 'Structured dict fields', 'user = {"id": 1, "email": "a@x.com", "active": True}\nprint(user["email"], user["active"])\n'],
          ['Boundary validation', 'Validate before use', 'def as_qty(raw):\n    qty = int(raw)\n    if qty < 1:\n        raise ValueError("qty >= 1")\n    return qty\n\nprint(as_qty("3"))\n'],
        ],
      },
      {
        n: 11,
        title: 'Files, Serialization & Configuration',
        exercises: [
          ['JSON config load', 'json.loads / dumps', 'import json\nraw = \'{"env": "dev", "max_orders": 50}\'\ncfg = json.loads(raw)\ncfg["env"] = "staging"\nprint(json.dumps(cfg))\nprint("max", cfg["max_orders"])\n'],
          ['CSV-like parse', 'Split rows in memory', 'text = "sku,qty\\nKB-01,2\\nMS-02,5"\nrows = [line.split(",") for line in text.splitlines()]\nprint(rows)\n'],
          ['Env-style settings', 'os.environ simulation', 'import os\nos.environ["APP_ENV"] = "production"\nos.environ["PORT"] = "8080"\nprint(os.environ.get("APP_ENV"), int(os.environ.get("PORT", "3000")))\n'],
          ['Secrets vs config', 'Redact sensitive keys', 'cfg = {"host": "api", "password": "s3cret", "port": 443}\nsafe = {k: ("***" if k == "password" else v) for k, v in cfg.items()}\nprint(safe)\n'],
          ['Pathlib-style names', 'Join path parts as strings', 'parts = ["data", "orders", "2026.csv"]\npath = "/".join(parts)\nprint(path)\nprint(path.endswith(".csv"))\n'],
        ],
      },
      {
        n: 12,
        title: 'Clean Code & Python Architecture',
        exercises: [
          ['Smell: long script', 'Before layering (messy)', 'total = 10 * 2\ntax = total * 0.13\nprint("pay", total + tax)\n'],
          ['Extract function', 'Small focused helper', 'def with_tax(amount, rate=0.13):\n    return round(amount * (1 + rate), 2)\n\nprint(with_tax(20))\n'],
          ['Repository layer', 'Storage behind API', 'class Repo:\n    def __init__(self):\n        self.data = {}\n    def save(self, key, value):\n        self.data[key] = value\n        return value\n\nr = Repo()\nprint(r.save("ORD-1", 50))\nprint(r.data)\n'],
          ['Service layer', 'Business rules above repo', 'class Repo:\n    def __init__(self):\n        self.data = {}\n    def save(self, k, v):\n        self.data[k] = v\n        return v\n\nclass Service:\n    def __init__(self, repo):\n        self.repo = repo\n    def place(self, order_id, total):\n        if total <= 0:\n            raise ValueError("bad total")\n        return self.repo.save(order_id, total)\n\nprint(Service(Repo()).place("ORD-1", 40))\n'],
          ['DTO-style payload', 'Transfer shape only', 'dto = {"order_id": "ORD-1", "total": 40.0, "currency": "CAD"}\nprint(dto["order_id"], dto["total"])\n'],
        ],
      },
    ],
  },
  {
    week: 4,
    title: 'Databases & Persistence',
    modules: [
      {
        n: 13,
        title: 'SQL for Python Developers',
        exercises: [
          ['Tables as dicts', 'Customers + orders', 'customers = {1: {"name": "Asha"}, 2: {"name": "Ben"}}\norders = [{"id": 10, "customer_id": 1, "total": 99.0}]\nfor o in orders:\n    print(o["id"], customers[o["customer_id"]]["name"], o["total"])\n'],
          ['CRUD mentally', 'Insert update delete map', 'rows = {}\nrows[1] = {"sku": "KB-01", "qty": 2}  # create\nrows[1]["qty"] = 5                   # update\nprint(rows[1])                       # read\ndel rows[1]                          # delete\nprint("empty", rows)\n'],
          ['Join simulation', 'Match foreign keys', 'customers = {1: "Asha", 2: "Ben"}\norders = [(10, 1, 40), (11, 2, 15)]\nfor oid, cid, total in orders:\n    print(oid, customers[cid], total)\n'],
          ['Aggregation', 'Sum totals by customer', 'orders = [(1, 40), (1, 10), (2, 15)]\ntotals = {}\nfor cid, amount in orders:\n    totals[cid] = totals.get(cid, 0) + amount\nprint(totals)\n'],
          ['Index mindset', 'Lookup by key O(1)', 'by_sku = {"KB-01": 12, "MS-02": 30}\nprint(by_sku.get("KB-01"), by_sku.get("ZZ"))\n'],
        ],
      },
      {
        n: 14,
        title: 'Python Database Programming',
        exercises: [
          ['Parameterized lookup', 'Never string-build SQL', 'inventory = [{"sku": "KB-01", "qty": 12}, {"sku": "MS-02", "qty": 30}]\n\ndef find(rows, sku):\n    for row in rows:\n        if row["sku"] == sku:\n            return row\n    return None\n\nprint(find(inventory, "MS-02"))\nprint(find(inventory, "HACK"))\n'],
          ['Transaction demo', 'Commit or rollback lists', 'db = []\npending = ["ORD-1", "ORD-2"]\ntry:\n    db.extend(pending)\n    if "BAD" in pending:\n        raise RuntimeError("fail")\n    print("commit", db)\nexcept RuntimeError:\n    db.clear()\n    print("rollback", db)\n'],
          ['Repository class', 'Encapsulate persistence', 'class OrderRepo:\n    def __init__(self):\n        self.rows = {}\n    def insert(self, order_id, total):\n        self.rows[order_id] = total\n    def get(self, order_id):\n        return self.rows.get(order_id)\n\nr = OrderRepo()\nr.insert("ORD-1", 88)\nprint(r.get("ORD-1"))\n'],
          ['Connection settings', 'DSN-like config', 'dsn = {"host": "localhost", "db": "shop", "user": "app"}\nprint(f"{dsn[\'user\']}@{dsn[\'host\']}/{dsn[\'db\']}")\n'],
          ['Pool size idea', 'Limit concurrent clients', 'pool_size = 5\nactive = 3\nprint("available", pool_size - active)\n'],
        ],
      },
      {
        n: 15,
        title: 'SQLAlchemy ORM',
        exercises: [
          ['Model class', 'ORM-style entity', 'class Product:\n    def __init__(self, id, sku, price):\n        self.id = id\n        self.sku = sku\n        self.price = price\n\np = Product(1, "KB-01", 79.0)\nprint(p.sku, p.price)\n'],
          ['Session identity map', 'Track objects by id', 'class Product:\n    def __init__(self, id, sku):\n        self.id = id\n        self.sku = sku\n\nclass Session:\n    def __init__(self):\n        self.identity_map = {}\n    def add(self, obj):\n        self.identity_map[obj.id] = obj\n    def get(self, id):\n        return self.identity_map.get(id)\n\ns = Session()\ns.add(Product(1, "KB"))\nprint(s.get(1).sku)\n'],
          ['Relationship list', 'Parent has children', 'order = {"id": "ORD-1", "lines": []}\norder["lines"].append({"sku": "KB", "qty": 1})\norder["lines"].append({"sku": "MS", "qty": 2})\nprint(len(order["lines"]))\n'],
          ['Lazy vs loaded', 'Flag whether children fetched', 'order = {"id": "ORD-1", "lines_loaded": False, "lines": None}\norder["lines"] = [{"sku": "KB"}]\norder["lines_loaded"] = True\nprint(order["lines_loaded"], order["lines"])\n'],
          ['N+1 smell', 'Bad loop of lookups', 'orders = [{"id": 1, "cid": 1}, {"id": 2, "cid": 1}]\ncustomers = {1: "Asha"}\n# better: one join; here we still key-lookup\nfor o in orders:\n    print(o["id"], customers[o["cid"]])\n'],
        ],
      },
      {
        n: 16,
        title: 'Database Migrations & Production Data Practices',
        exercises: [
          ['Versioned schema', 'Apply migration steps', 'schema = {"version": 1, "columns": ["id", "sku", "qty"]}\nfor step in [{"to": 2, "add": "price"}, {"to": 3, "add": "updated_at"}]:\n    schema["columns"].append(step["add"])\n    schema["version"] = step["to"]\n    print("v", schema["version"], schema["columns"])\n'],
          ['Rollback step', 'Undo last migration', 'versions = [1, 2, 3]\nprint("current", versions[-1])\nversions.pop()\nprint("rolled back to", versions[-1])\n'],
          ['Seed data', 'Insert starter rows', 'seeds = [{"sku": "KB-01", "qty": 10}, {"sku": "MS-02", "qty": 20}]\ntable = list(seeds)\nprint(table)\n'],
          ['Dangerous migration review', 'Flag drop column', 'change = {"action": "drop_column", "column": "email"}\nrisky = change["action"] in {"drop_column", "drop_table"}\nprint("risky?", risky, change)\n'],
          ['Index add', 'Track indexes list', 'indexes = ["idx_orders_customer"]\nindexes.append("idx_products_sku")\nprint(indexes)\n'],
        ],
      },
    ],
  },
  {
    week: 5,
    title: 'Enterprise REST API Development',
    modules: [
      {
        n: 17,
        title: 'HTTP & REST API Fundamentals',
        exercises: [
          ['Status responses', 'Map method/path to status', 'def handle(method, path):\n    if method == "GET" and path == "/orders/1":\n        return 200, {"id": "1"}\n    if method == "POST" and path == "/orders":\n        return 201, {"id": "2"}\n    return 404, {"error": "not_found"}\n\nprint(handle("GET", "/orders/1"))\nprint(handle("GET", "/nope"))\n'],
          ['Idempotent PUT idea', 'Same result on repeat', 'store = {}\n\ndef put_item(item_id, body):\n    store[item_id] = body\n    return store[item_id]\n\nprint(put_item("p1", {"name": "KB"}))\nprint(put_item("p1", {"name": "KB"}))\n'],
          ['Query filters', 'Filter collection', 'orders = [{"id": 1, "status": "NEW"}, {"id": 2, "status": "PAID"}]\nstatus = "PAID"\nprint([o for o in orders if o["status"] == status])\n'],
          ['Pagination slice', 'limit/offset', 'items = list(range(1, 21))\nlimit, offset = 5, 5\npage = items[offset:offset + limit]\nprint(page)\n'],
          ['Error body shape', 'Standard error JSON', 'err = {"error": "validation_error", "details": ["qty must be > 0"]}\nprint(err)\n'],
        ],
      },
      {
        n: 18,
        title: 'FastAPI',
        exercises: [
          ['Create + validate', 'Reject negative price', 'store = {}\n\ndef create_item(item_id, name, price):\n    if price < 0:\n        return {"error": "price must be >= 0"}, 422\n    store[item_id] = {"id": item_id, "name": name, "price": price}\n    return store[item_id], 201\n\nprint(create_item("p1", "Keyboard", 79))\nprint(create_item("p2", "Bad", -1))\n'],
          ['GET by id', '404 when missing', 'store = {"p1": {"id": "p1", "name": "KB"}}\n\ndef get_item(item_id):\n    item = store.get(item_id)\n    if not item:\n        return {"error": "not found"}, 404\n    return item, 200\n\nprint(get_item("p1"))\nprint(get_item("x"))\n'],
          ['List endpoint', 'Return collection', 'store = {"p1": {"name": "KB"}, "p2": {"name": "MS"}}\nprint(list(store.values()))\n'],
          ['Update endpoint', 'Patch fields', 'item = {"id": "p1", "name": "KB", "price": 79}\nitem["price"] = 69\nprint(item)\n'],
          ['Delete endpoint', 'Remove and confirm', 'store = {"p1": {"name": "KB"}}\ndeleted = store.pop("p1", None)\nprint(deleted, store)\n'],
        ],
      },
      {
        n: 19,
        title: 'Enterprise API Architecture',
        exercises: [
          ['Router → service → repo', 'Three layers', 'class Repo:\n    def __init__(self):\n        self.data = {}\n    def save(self, key, value):\n        self.data[key] = value\n        return value\n\nclass Service:\n    def __init__(self, repo):\n        self.repo = repo\n    def create_order(self, order_id, total):\n        return self.repo.save(order_id, {"id": order_id, "total": total})\n\ndef router_post(service, order_id, total):\n    return {"status": 201, "data": service.create_order(order_id, total)}\n\nprint(router_post(Service(Repo()), "ORD-42", 88.0))\n'],
          ['Correlation id', 'Pass request id through', 'def handle(correlation_id, action):\n    return {"correlation_id": correlation_id, "action": action}\n\nprint(handle("req-7f3a", "create_order"))\n'],
          ['Standard response', 'Envelope pattern', 'def ok(data):\n    return {"success": True, "data": data}\n\nprint(ok({"id": "ORD-1"}))\n'],
          ['Domain vs DTO', 'Separate shapes', 'domain = {"order_id": "ORD-1", "total_cents": 8800}\ndto = {"id": domain["order_id"], "total": domain["total_cents"] / 100}\nprint(dto)\n'],
          ['Global error map', 'Exception → status', 'def to_http(exc):\n    if isinstance(exc, ValueError):\n        return 400\n    return 500\n\nprint(to_http(ValueError("bad")))\nprint(to_http(RuntimeError("x")))\n'],
        ],
      },
      {
        n: 20,
        title: 'Authentication & API Security',
        exercises: [
          ['RBAC check', 'Admin-only delete', 'users = {"asha": {"role": "admin"}, "ben": {"role": "viewer"}}\n\ndef authorize(username, action):\n    user = users.get(username)\n    if not user:\n        return False, "unknown user"\n    if action == "delete_order" and user["role"] != "admin":\n        return False, "forbidden"\n    return True, "ok"\n\nfor who in ["asha", "ben", "zoe"]:\n    print(who, authorize(who, "delete_order"))\n'],
          ['Password hash placeholder', 'Never store raw password', 'def fake_hash(password):\n    return "sha256:" + str(abs(hash(password)) % 10_000_000)\n\nprint(fake_hash("secret") != "secret")\n'],
          ['JWT-like claims', 'Dict token payload', 'token = {"sub": "asha", "role": "admin", "exp": 9999999999}\nprint(token["sub"], token["role"])\n'],
          ['CORS allowlist', 'Check origin', 'allowed = {"https://computergeekacademy.com"}\norigin = "https://evil.example"\nprint(origin in allowed)\n'],
          ['Injection guard', 'Reject suspicious sku', 'def is_safe_sku(sku):\n    return sku.replace("-", "").isalnum()\n\nprint(is_safe_sku("KB-01"), is_safe_sku("x; DROP"))\n'],
        ],
      },
    ],
  },
  {
    week: 6,
    title: 'Testing, Concurrency & Performance',
    modules: [
      {
        n: 21,
        title: 'Automated Testing with pytest',
        exercises: [
          ['Assert unit tests', 'pytest-style asserts', 'def add(a, b):\n    return a + b\n\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint("All tests passed")\n'],
          ['Param-style cases', 'Table of examples', 'cases = [(2, 3, 5), (0, 0, 0), (10, -1, 9)]\nfor a, b, expected in cases:\n    assert a + b == expected\nprint("param cases ok")\n'],
          ['Mock dependency', 'Replace collaborator', 'class FakeRepo:\n    def get(self, id):\n        return {"id": id, "total": 10}\n\ndef service_total(repo, id):\n    return repo.get(id)["total"]\n\nprint(service_total(FakeRepo(), "ORD-1"))\n'],
          ['API status test', 'Assert status code', 'def get_order(exists):\n    return (200, {"id": 1}) if exists else (404, {"error": "missing"})\n\ncode, _ = get_order(True)\nassert code == 200\ncode, _ = get_order(False)\nassert code == 404\nprint("api tests ok")\n'],
          ['Coverage mindset', 'Track which branches ran', 'hit = {"ok": False, "err": False}\ntry:\n    int("x")\nexcept ValueError:\n    hit["err"] = True\nhit["ok"] = True\nprint(hit)\n'],
        ],
      },
      {
        n: 22,
        title: 'Test-Driven Development & Quality Engineering',
        exercises: [
          ['TDD free shipping', 'Red-green rule', 'def qualifies_for_free_shipping(total, member):\n    return member and total >= 50\n\nassert qualifies_for_free_shipping(60, True) is True\nassert qualifies_for_free_shipping(60, False) is False\nassert qualifies_for_free_shipping(20, True) is False\nprint("TDD checks green")\n'],
          ['Quality gate list', 'Lint/test/type flags', 'gates = {"lint": True, "tests": True, "types": True}\nprint("pipeline green?", all(gates.values()))\n'],
          ['Pre-commit checklist', 'Simulate hook results', 'hooks = [("ruff", True), ("black", True)]\nfor name, ok in hooks:\n    print(name, "PASS" if ok else "FAIL")\n'],
          ['Contract shape test', 'Required keys present', 'payload = {"id": "1", "total": 10}\nrequired = {"id", "total"}\nassert required.issubset(payload)\nprint("contract ok")\n'],
          ['Refactor with tests', 'Keep behavior stable', 'def price_with_tax(amount):\n    return round(amount * 1.13, 2)\n\nassert price_with_tax(100) == 113.0\nprint(price_with_tax(50))\n'],
        ],
      },
      {
        n: 23,
        title: 'Concurrency & Asynchronous Python',
        exercises: [
          ['asyncio gather', 'Concurrent fake fetches', 'import asyncio\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)\n    return f"{name}-done"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("inventory", 0.01),\n        fetch("pricing", 0.01),\n        fetch("tax", 0.01),\n    )\n    print(results)\n\nasyncio.run(main())\n'],
          ['Async sleep sequence', 'Awaitable steps', 'import asyncio\n\nasync def steps():\n    print("start")\n    await asyncio.sleep(0.01)\n    print("middle")\n    await asyncio.sleep(0.01)\n    print("end")\n\nasyncio.run(steps())\n'],
          ['Choose model note', 'CPU vs IO label', 'tasks = [{"name": "resize_image", "bound": "cpu"}, {"name": "http_get", "bound": "io"}]\nfor t in tasks:\n    print(t["name"], "->", "process/thread" if t["bound"] == "cpu" else "asyncio")\n'],
          ['Future-style result', 'Store completed value', 'class Future:\n    def __init__(self):\n        self.value = None\n    def set(self, value):\n        self.value = value\n\nf = Future()\nf.set(42)\nprint(f.value)\n'],
          ['Race-safe counter caution', 'Single-threaded increment', 'counter = 0\nfor _ in range(1000):\n    counter += 1\nprint(counter)\n'],
        ],
      },
      {
        n: 24,
        title: 'Python Performance Engineering',
        exercises: [
          ['List vs generator', 'Memory-friendly sum', 'def sum_squares_list(n):\n    return sum([i * i for i in range(n)])\n\ndef sum_squares_gen(n):\n    return sum(i * i for i in range(n))\n\nn = 1000\nprint(sum_squares_list(n) == sum_squares_gen(n))\n'],
          ['Better structure', 'Dict lookup vs scan', 'rows = [{"sku": "A", "qty": 1}, {"sku": "B", "qty": 2}]\nby_sku = {r["sku"]: r for r in rows}\nprint(by_sku["B"]["qty"])\n'],
          ['Cache hot value', 'Memo dict', 'cache = {}\n\ndef expensive(n):\n    if n in cache:\n        return cache[n]\n    cache[n] = n * n\n    return cache[n]\n\nprint(expensive(9), expensive(9), cache)\n'],
          ['Complexity note', 'Count loop steps', 'steps = 0\nfor i in range(10):\n    for j in range(10):\n        steps += 1\nprint("steps", steps)\n'],
          ['Benchmark-ish', 'Compare two approaches', 'data = list(range(500))\nslow = []\nfor x in data:\n    slow.append(x * 2)\nfast = [x * 2 for x in data]\nprint(slow == fast)\n'],
        ],
      },
    ],
  },
  {
    week: 7,
    title: 'Distributed Systems & Production Infrastructure',
    modules: [
      {
        n: 25,
        title: 'Background Processing & Messaging',
        exercises: [
          ['Task queue', 'deque worker', 'from collections import deque\nqueue = deque([{"type": "ORDER_PLACED", "id": "ORD-1"}, {"type": "ORDER_PLACED", "id": "ORD-2"}])\nprocessed = []\nwhile queue:\n    job = queue.popleft()\n    processed.append(job["id"])\n    print("handled", job)\nprint("done", processed)\n'],
          ['Retry with backoff list', 'Attempt schedule', 'attempts = [0.1, 0.2, 0.4]\nfor i, delay in enumerate(attempts, start=1):\n    print(f"attempt {i} wait {delay}s")\n'],
          ['Idempotent worker', 'Skip duplicate ids', 'seen = set()\n\ndef handle(order_id):\n    if order_id in seen:\n        return "duplicate"\n    seen.add(order_id)\n    return "processed"\n\nprint(handle("ORD-1"), handle("ORD-1"))\n'],
          ['DLQ idea', 'Failed jobs side queue', 'main_q = ["ok", "bad", "ok"]\ndlq = []\nfor job in main_q:\n    if job == "bad":\n        dlq.append(job)\n    else:\n        print("processed", job)\nprint("dlq", dlq)\n'],
          ['Event payload', 'Order placed event', 'event = {"type": "ORDER_PLACED", "order_id": "ORD-9", "total": 120}\nprint(event)\n'],
        ],
      },
      {
        n: 26,
        title: 'Caching & Resilience',
        exercises: [
          ['Cache-aside', 'Miss then hit', 'cache = {}\ndb = {"KB-01": 79.0}\n\ndef get_price(sku):\n    if sku in cache:\n        print("cache hit", sku)\n        return cache[sku]\n    print("cache miss", sku)\n    if sku not in db:\n        return None\n    cache[sku] = db[sku]\n    return cache[sku]\n\nprint(get_price("KB-01"))\nprint(get_price("KB-01"))\n'],
          ['TTL entry', 'Expire manually', 'import time\nentry = {"value": 10, "expires_at": time.time() + 60}\nprint("fresh", entry["expires_at"] > time.time())\n'],
          ['Timeout fallback', 'Default on failure', 'def call_upstream(ok):\n    if not ok:\n        raise TimeoutError("slow")\n    return 42\n\ntry:\n    print(call_upstream(False))\nexcept TimeoutError:\n    print("fallback", 0)\n'],
          ['Circuit open', 'Stop calling after failures', 'failures = 3\ncircuit_open = failures >= 3\nprint("circuit_open", circuit_open)\n'],
          ['Health check', 'liveness flag', 'app = {"ready": True, "alive": True}\nprint(200 if app["alive"] else 500, 200 if app["ready"] else 503)\n'],
        ],
      },
      {
        n: 27,
        title: 'Docker & Containerization',
        exercises: [
          ['12-factor config', 'Env injected settings', 'import os\nos.environ["APP_ENV"] = "production"\nos.environ["PORT"] = "8080"\nprint({"env": os.environ["APP_ENV"], "port": int(os.environ["PORT"])})\n'],
          ['Image layers list', 'Dockerfile stages as list', 'layers = ["base", "deps", "app", "runtime"]\nprint(" -> ".join(layers))\n'],
          ['Non-root user flag', 'Security default', 'config = {"user": "app", "root": False}\nprint("safe_user", not config["root"], config["user"])\n'],
          ['Healthcheck command', 'Represent probe', 'probe = {"type": "HTTP", "path": "/health", "interval": 30}\nprint(probe)\n'],
          ['Compose services map', 'api + db + redis', 'services = ["api", "db", "redis"]\nprint({name: "running" for name in services})\n'],
        ],
      },
      {
        n: 28,
        title: 'CI/CD for Python',
        exercises: [
          ['CI quality gates', 'lint/test/type', 'def run_gate(name, ok):\n    print(("PASS" if ok else "FAIL"), name)\n    return ok\n\nresults = [run_gate("lint", True), run_gate("unit-tests", True), run_gate("typecheck", True)]\nprint("Pipeline green?", all(results))\n'],
          ['Failed job diagnose', 'Find first failure', 'steps = [("lint", True), ("tests", False), ("build", True)]\nfailed = [n for n, ok in steps if not ok]\nprint("failed", failed)\n'],
          ['Artifact version', 'Build tag', 'sha = "abc1234"\nimage = f"shop-api:{sha}"\nprint(image)\n'],
          ['Promote environments', 'dev → staging → prod', 'envs = ["dev", "staging", "prod"]\nfor e in envs:\n    print("deploy", e)\n'],
          ['Rollback pointer', 'Previous release', 'releases = ["v1", "v2", "v3"]\ncurrent = releases[-1]\nprevious = releases[-2]\nprint("rollback from", current, "to", previous)\n'],
        ],
      },
    ],
  },
  {
    week: 8,
    title: 'Enterprise Production Engineering',
    modules: [
      {
        n: 29,
        title: 'Cloud & Kubernetes Fundamentals',
        exercises: [
          ['Health probes', 'Liveness vs readiness', 'app = {"ready": False, "alive": True}\n\ndef liveness():\n    return 200 if app["alive"] else 500\n\ndef readiness():\n    return 200 if app["ready"] else 503\n\nprint("live", liveness(), "ready", readiness())\napp["ready"] = True\nprint("live", liveness(), "ready", readiness())\n'],
          ['Resource map', 'Deploy/Service names', 'resources = {"Deployment": "api", "Service": "api-svc", "ConfigMap": "api-config"}\nprint(resources)\n'],
          ['Replica count', 'Desired vs ready', 'desired, ready = 3, 2\nprint("progress", ready, "/", desired)\n'],
          ['Rolling update flag', 'Strategy label', 'strategy = {"type": "RollingUpdate", "maxUnavailable": 1}\nprint(strategy)\n'],
          ['Failed deploy symptom', 'CrashLoop detect', 'restarts = 5\nprint("crashloop_suspect", restarts >= 5)\n'],
        ],
      },
      {
        n: 30,
        title: 'Observability & Production Monitoring',
        exercises: [
          ['Structured logs', 'JSON log + correlation id', 'import json\n\ndef log_event(level, message, correlation_id, **fields):\n    print(json.dumps({"level": level, "msg": message, "correlation_id": correlation_id, **fields}))\n\ncid = "req-7f3a"\nlog_event("INFO", "order_created", cid, order_id="ORD-9", total=120)\nlog_event("ERROR", "payment_failed", cid, reason="card_declined")\n'],
          ['Metric counter', 'Increment requests', 'metrics = {"http_requests": 0}\nmetrics["http_requests"] += 1\nmetrics["http_requests"] += 1\nprint(metrics)\n'],
          ['Trace spans', 'Parent/child span ids', 'spans = [{"span": "http", "id": "s1"}, {"span": "db", "id": "s2", "parent": "s1"}]\nprint(spans)\n'],
          ['SLO burn', 'Error ratio', 'requests, errors = 1000, 5\nerror_rate = errors / requests\nprint("error_rate", error_rate, "slo_ok", error_rate < 0.01)\n'],
          ['Incident timeline', 'Ordered events', 'events = ["alert", "page_oncall", "mitigate", "postmortem"]\nfor i, e in enumerate(events, 1):\n    print(i, e)\n'],
        ],
      },
      {
        n: 31,
        title: 'Production Security & Reliability',
        exercises: [
          ['Redact secrets', 'Mask sensitive keys', 'SECRET_KEYS = ("password", "api_key", "token")\n\ndef redact(config):\n    return {k: ("***" if k in SECRET_KEYS else v) for k, v in config.items()}\n\nprint(redact({"host": "api.local", "password": "s3cret", "api_key": "abc", "port": 443}))\n'],
          ['Threat note', 'Simple STRIDE tag', 'threats = [{"item": "auth bypass", "category": "Spoofing"}]\nprint(threats[0])\n'],
          ['Graceful shutdown', 'Drain flag', 'state = {"accepting": True}\nstate["accepting"] = False\nprint("draining", not state["accepting"])\n'],
          ['TLS required', 'Reject plain http flag', 'url = "https://api.example/orders"\nprint(url.startswith("https://"))\n'],
          ['Supply chain pin', 'Hash presence check', 'lock = {"pkg": "requests", "version": "2.32.0", "hash": "sha256:demo"}\nprint("pinned", "hash" in lock)\n'],
        ],
      },
      {
        n: 32,
        title: 'Enterprise Architecture & Production Code Review',
        exercises: [
          ['Architecture checklist', 'Production readiness flags', 'checklist = {\n    "layered_api": True,\n    "auth_present": True,\n    "tests_exist": True,\n    "observability": True,\n    "migrations": True,\n}\nfailed = [name for name, ok in checklist.items() if not ok]\nprint("Ready?", len(failed) == 0)\nprint("Failed:", failed)\n'],
          ['Monolith vs services', 'Choose by coupling', 'components = ["api", "worker", "db"]\nprint("modular monolith ok for", components)\n'],
          ['ADR record', 'Decision log entry', 'adr = {"title": "Use Postgres", "status": "accepted", "reason": "relational orders"}\nprint(adr)\n'],
          ['Review comment', 'Code review finding', 'finding = {"file": "orders.py", "issue": "missing validation", "severity": "medium"}\nprint(finding)\n'],
          ['Capstone shape', 'Layers present', 'layers = ["router", "service", "repository", "domain"]\nprint(" -> ".join(layers))\n'],
        ],
      },
    ],
  },
];

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const examples = [];
const weekMeta = [];

for (const w of OUTLINE) {
  weekMeta.push(`  { week: ${w.week}, title: ${JSON.stringify(w.title)} },`);
  for (const mod of w.modules) {
    mod.exercises.forEach((ex, idx) => {
      const [exTitle, desc, code] = ex;
      const num = idx + 1;
      const id = `w${w.week}-m${mod.n}-ex${num}`;
      examples.push(`  {
    id: ${JSON.stringify(id)},
    week: ${w.week},
    module: ${mod.n},
    moduleTitle: ${JSON.stringify(mod.title)},
    exercise: ${num},
    title: ${JSON.stringify(`M${mod.n} · Ex${num} · ${exTitle}`)},
    description: ${JSON.stringify(`Week ${w.week} · Module ${mod.n}: ${mod.title} — ${desc}`)},
    code: ${JSON.stringify(code)},
  }`);
    });
  }
}

const out = `/**
 * Python Visual Code Lab — 5 exercises per module title from the bootcamp outline.
 * Generated by scripts/generate-lab-examples.mjs (do not hand-edit at scale).
 */

/** @typedef {{ id: string, week: number, module: number, moduleTitle: string, exercise: number, title: string, description: string, code: string }} LabExample */

/** @type {LabExample[]} */
export const pythonExamples = [
${examples.join(',\n')}
];

export const BOOTCAMP_LAB_WEEKS = [
${weekMeta.join('\n')}
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

const target = join(__dirname, '..', 'src', 'data', 'labExamples.js');
writeFileSync(target, out, 'utf8');
console.log(`Wrote ${examples.length} exercises -> ${target}`);
