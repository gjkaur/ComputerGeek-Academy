---
marp: true
theme: flat-gaia
paginate: true
footer: '© 2026 ComputerGeek Academy — Python Software Engineer Bootcamp'
---

<!-- _class: lead -->

# Python Software Engineer Bootcamp

## Beginner → Enterprise Production Development

**ComputerGeek Academy** · 8 weeks · Instructor-led + labs + capstone

<!--
Welcome learners. This deck focuses on the Python bootcamp only.
Point them to the free Python Code Lab for Week 1 dry-runs.
-->

---

<!-- _class: content -->

# Who this bootcamp is for

- Absolute beginners and early-career developers
- Anyone who wants **real production skills**, not only syntax
- Learners ready for weekly labs and a serious capstone

**End goal:** Build, test, secure, containerize, deploy, monitor, and maintain production-quality Python applications.

<!--
Emphasize: syntax alone is not enough — we go to production engineering.
-->

---

<!-- _class: content -->

# What you will build toward

## Capstone — Enterprise Order & Inventory Platform

- FastAPI REST API + Auth / RBAC
- Service & repository layers
- PostgreSQL + SQLAlchemy + Alembic
- Redis cache + background workers
- Docker · CI/CD · Kubernetes · observability

<!--
Show the big picture early so Week 1 foundations feel purposeful.
-->

---

<!-- _class: fit-md -->

# 8-week roadmap

| Week | Focus |
|------|--------|
| **1** | Python foundations (variables, control flow, collections) |
| **2** | Functions, packages, OOP, logging |
| **3** | Advanced Python, typing, clean architecture |
| **4** | SQL, PostgreSQL, SQLAlchemy, migrations |
| **5** | REST, FastAPI, enterprise API, security |
| **6** | pytest, TDD, asyncio, performance |
| **7** | Celery, Redis, Docker, CI/CD |
| **8** | Kubernetes, observability, security, architecture review |

<!--
This PPT focuses deep content on Week 1 for now. Later weeks = roadmap slides.
-->

---

<!-- _class: content -->

# Recommended stack (capstone)

| Area | Technology |
|------|------------|
| Language | Python 3.13+ |
| API | FastAPI + Pydantic |
| Database | PostgreSQL + SQLAlchemy + Alembic |
| Tests | pytest · Ruff · mypy/Pyright |
| Cache / jobs | Redis · Celery |
| Ship | Docker · GitHub Actions · Kubernetes |

<!--
Do not overwhelm beginners — say “you will grow into this stack.”
-->

---

<!-- _class: content -->

# Free practice: Python Code Lab

While learning Week 1, use the **in-browser Python Visual Lab**:

1. Open **Code Labs → Python Lab** on ComputerGeek Academy
2. Click **Trace program**
3. Use **Step →** to dry-run line by line
4. Watch **memory boxes** and **screen output** with arrows

**No install required** — perfect for absolute beginners.

<!--
Demo the lab live if possible in the first session.
-->

---

<!-- _class: lead -->

# Week 1 — Python Foundations

Modules 1–4 · Environment, data, control flow, collections

<!--
Week 1 opener. Labs every module. Use Code Lab for variables & loops.
-->

---

<!-- _header: 'Module 1 — Python & Software Development Fundamentals' -->

<!-- _class: lead -->

# Module 1

## Python & Software Development Fundamentals

<!--
Module 1 opener.
-->

---

<!-- _class: split -->

# Lesson 1.1 — Why Python?

- Readable, beginner-friendly language
- Huge ecosystem (web, data, automation, AI)
- Strong enterprise demand for **backend & tooling**
- One language from scripts → production services

**ComputerGeek focus:** professional software engineering with Python

<!--
Connect motivation to careers, not just “Python is popular.”
-->

---

<!-- _class: split -->

# Lesson 1.2 — Running Python

- Install a current Python 3.x
- `python --version` / `py --version`
- REPL for quick experiments
- `.py` files for real programs
- IDE: **VS Code** or **PyCharm**

**PEP 8** = style guide for readable code

<!--
Have learners verify install together. Fix PATH issues early.
-->

---

<!-- _class: content -->

# Lesson 1.3 — First application & debugging

```python
def main():
    name = input("Your name: ")
    print(f"Welcome to ComputerGeek Academy, {name}!")

if __name__ == "__main__":
    main()
```

- Project folder structure matters from day one
- Print / debugger / read error messages carefully
- Small, runnable programs beat long untested notes

<!--
Walk through a deliberate bug and how to read the traceback.
-->

---

<!-- _class: fit-md -->

## Exercise 1.1 — Steps 1–2

**Lab:** Dev environment & CLI app

**Step 1 — Verify Python**
- **Do:** Open terminal; run `python --version` (or `py --version`).
- **Expected:** A Python 3.x version prints.

**Step 2 — Create project folder**
- **Do:** Create `week01-cli/` and open it in VS Code.
- **Expected:** Empty project ready for `main.py`.

<!--
Time-box tightly. Help anyone stuck on install immediately.
-->

---

<!-- _class: fit-md -->

## Exercise 1.1 — Steps 3–4

**Step 3 — Write CLI app**
- **Do:** Create `main.py` that greets the user and prints today’s focus (“Python Foundations”).
- **Expected:** Running the file prints a clear greeting.

**Step 4 — Add a tiny menu**
- **Do:** Offer 2–3 menu choices (e.g., About / Lab tip / Exit).
- **Expected:** Loop until Exit; no crash on bad input (basic handling OK).

<!--
Collect 2–3 demos. Praise clean structure over cleverness.
-->

---

<!-- _header: 'Module 2 — Variables, Data Types & Operators' -->

<!-- _class: lead -->

# Module 2

## Variables, Data Types & Operators

<!--
Module 2 opener. Pair with Code Lab memory boxes.
-->

---

<!-- _class: split -->

# Lesson 2.1 — Variables & types

- Names point to **values in memory**
- Dynamic typing — type can change, but clarity still matters
- Common types: `int`, `float`, `bool`, `str`, `None`
- Inspect with `type()` / `isinstance()`

**Dry-run tip:** In Code Lab, watch boxes appear when you assign.

<!--
Draw name → value boxes on whiteboard if teaching in person.
-->

---

<!-- _class: split -->

# Lesson 2.2 — Operators & type hints

- Arithmetic · comparison · logical · assignment
- Precedence — use parentheses for clarity
- Mutability vs immutability (preview)
- Intro type hints:

```python
def add_tax(amount: float, rate: float) -> float:
    return amount * (1 + rate)
```

<!--
Type hints are documentation + future tooling — keep gentle in Week 1.
-->

---

<!-- _class: fit-md -->

## Exercise 2.1 — Steps 1–2

**Lab:** Typed data-processing utility (+ Code Lab)

**Step 1 — Trace in Code Lab**
- **Do:** Open Python Lab → “Hello & Variables” → Trace → Step.
- **Expected:** See `name` and `age` memory boxes; output appears after prints.

**Step 2 — Swap dry-run**
- **Do:** Load “Swap Two Numbers”; step until `a` and `b` have swapped.
- **Expected:** You can explain each arrow: code → memory → output.

<!--
This is the “aha” moment for beginners — don’t rush.
-->

---

<!-- _class: fit-md -->

## Exercise 2.1 — Steps 3–4

**Step 3 — Utility functions**
- **Do:** Write functions to clean a price string and compute tax (with type hints).
- **Expected:** Clear inputs/outputs; no magic numbers unexplained.

**Step 4 — Mini report**
- **Do:** Process a small list of amounts; print total and average.
- **Expected:** Correct numeric results; readable output labels.

<!--
Check type hints are present even if checker isn’t set up yet.
-->

---

<!-- _header: 'Module 3 — Control Flow' -->

<!-- _class: lead -->

# Module 3

## Control Flow

<!--
Module 3 opener.
-->

---

<!-- _class: split -->

# Lesson 3.1 — Decisions

- `if` / `elif` / `else`
- Truthy and falsy values
- Conditional expressions (ternary)
- `match` / `case` (modern pattern matching)

**Rule of thumb:** Prefer clear branches over nested spaghetti.

<!--
Show one messy nested if, then a cleaner rewrite.
-->

---

<!-- _class: split -->

# Lesson 3.2 — Loops

- `for` · `while` · `range()`
- `break` · `continue` · `pass`
- Nested loops — use carefully
- Loop best practices: clear exit conditions

**Code Lab:** “Loop & Counter” — watch `i` and `total` update each step.

<!--
Connect loops to memory visualization explicitly.
-->

---

<!-- _class: fit-md -->

## Exercise 3.1 — Steps 1–2

**Lab:** Rule-based transaction processor

**Step 1 — Define rules**
- **Do:** List rules (e.g., amount > 1000 → review; status == "fraud" → block).
- **Expected:** Written rules before coding.

**Step 2 — Implement decisions**
- **Do:** Code `if/elif/else` (or `match`) to classify each transaction.
- **Expected:** Sample inputs map to the correct action labels.

<!--
Emphasize designing rules first — software engineering habit.
-->

---

<!-- _class: fit-md -->

## Exercise 3.1 — Steps 3–4

**Step 3 — Process a list**
- **Do:** Loop through several transactions; print classification for each.
- **Expected:** All rows processed; counts of approved/review/blocked.

**Step 4 — Code Lab check**
- **Do:** Trace “If / Else Decision” in Python Lab.
- **Expected:** You can predict which branch runs before stepping.

<!--
Ask learners to predict before Step — builds dry-run skill.
-->

---

<!-- _header: 'Module 4 — Python Collections' -->

<!-- _class: lead -->

# Module 4

## Python Collections

<!--
Module 4 opener — closes Week 1 foundations.
-->

---

<!-- _class: split -->

# Lesson 4.1 — Core collections

| Type | Ordered | Mutable | Typical use |
|------|---------|---------|-------------|
| `list` | Yes | Yes | Sequences |
| `tuple` | Yes | No | Fixed records |
| `set` | No | Yes | Unique items |
| `dict` | Yes* | Yes | Key → value maps |

\*Insertion-ordered in modern Python

<!--
Choosing the right structure is an engineering decision.
-->

---

<!-- _class: split -->

# Lesson 4.2 — Working with collections

- Indexing & slicing
- Comprehensions (list / dict / set)
- `enumerate()` · `zip()`
- Sorting and nested structures
- Performance mindset: pick the right tool

**Code Lab:** “List in Memory” — watch a list grow with `append`.

<!--
Warn that nested dict/list debugging needs dry-runs.
-->

---

<!-- _class: fit-md -->

## Exercise 4.1 — Steps 1–2

**Lab:** In-memory inventory system

**Step 1 — Model data**
- **Do:** Choose structures for SKUs, quantities, and prices (often `dict`).
- **Expected:** Clear data model sketched before coding.

**Step 2 — Core operations**
- **Do:** Implement add / update quantity / lookup.
- **Expected:** Operations work on sample inventory without crashes.

<!--
Reject over-engineering — Week 1 dicts are enough.
-->

---

<!-- _class: fit-md -->

## Exercise 4.1 — Steps 3–4

**Step 3 — Report**
- **Do:** Print low-stock items and total inventory value.
- **Expected:** Correct filtering and totals.

**Step 4 — Week 1 checkpoint**
- **Do:** Commit your Week 1 folder; write 5 lines on what “memory” means in Python.
- **Expected:** Repo + short reflection ready for instructor review.

<!--
Celebrate finishing Week 1 foundations.
-->

---

<!-- _class: lead -->

# Weeks 2–8 — What’s next

Roadmap only for now · detailed slides coming module by module

<!--
Set expectations: this PPT is Python bootcamp focus; deep slides expand over time.
-->

---

<!-- _class: content -->

# Week 2 — Functions, OOP & Professional Python

- Functions, `*args` / `**kwargs`, scope
- Modules, packages, `venv`, `pyproject.toml`
- Classes, inheritance, composition, dataclasses
- Exceptions, logging, defensive programming

**Lab theme:** Refactor Week 1 into a small professional package + OOP orders.

---

<!-- _class: content -->

# Week 3 — Advanced Python & Engineering Practices

- Generators, decorators, context managers
- Type-safe Python (mypy / Pyright)
- Files, JSON/CSV, configuration & secrets
- Clean code, SOLID, layered architecture

**Lab theme:** Typed, configurable service with clean layers.

---

<!-- _class: content -->

# Week 4 — Databases & Persistence

- SQL + PostgreSQL fundamentals
- DB-API, parameterized queries, pooling
- SQLAlchemy ORM
- Alembic migrations & production data practices

**Lab theme:** Schema + persistence layer for the capstone domain.

---

<!-- _class: content -->

# Week 5 — Enterprise REST API Development

- HTTP & REST design
- FastAPI + Pydantic
- Router / service / repository architecture
- JWT, RBAC, API security (OWASP awareness)

**Lab theme:** Secure CRUD API with enterprise structure.

---

<!-- _class: content -->

# Week 6 — Testing, Concurrency & Performance

- pytest, fixtures, mocking, API tests
- TDD + Ruff / quality gates
- asyncio & concurrency choices
- Profiling and optimization

**Lab theme:** Test suite + async workflow + measured speedups.

---

<!-- _class: content -->

# Week 7 — Distributed Systems & Infrastructure

- Celery / messaging concepts
- Redis caching & resilience patterns
- Docker & Compose
- CI/CD with GitHub Actions

**Lab theme:** Containerized app + background jobs + pipeline.

---

<!-- _class: content -->

# Week 8 — Enterprise Production Engineering

- Kubernetes fundamentals
- Observability (logs, metrics, traces)
- Security & production readiness
- Architecture review & ADRs

**Lab theme:** Deploy, instrument, and review the bootcamp application.

---

<!-- _class: lead -->

# Ready for Week 1 labs

## Trace · Step · Understand memory · Then code

**ComputerGeek Academy** · Python Software Engineer Bootcamp

<!--
Close with Code Lab demo reminder and next meeting logistics.
-->
