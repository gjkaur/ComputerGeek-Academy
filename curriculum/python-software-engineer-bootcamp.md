# Python Software Engineer Bootcamp

**Beginner → Enterprise Production Development**

| | |
|---|---|
| **Duration** | 8 weeks |
| **Format** | Instructor-led + hands-on labs + projects |
| **Target** | Beginner / early-career developers |
| **End goal** | Build, test, secure, containerize, deploy, monitor, and maintain production-quality Python applications |
| **Website course id** | `python-software-engineer-bootcamp` |
| **Code Lab** | `/labs/python` (dry-run memory visualizer for Week 1 foundations) |

---

## Progression

Python fundamentals → professional Python → architecture → databases → APIs → security/testing → concurrency/performance → distributed systems → containers/CI/CD → Kubernetes/observability → production engineering

---

## Week 1 — Python Foundations

### Module 1: Python & Software Development Fundamentals
What is Python · ecosystem & enterprise use cases · installing Python · versions · CPython · running programs · REPL · IDE (VS Code / PyCharm) · project folders · PEP 8 · first application · debugging fundamentals  
**Lab:** Set up the development environment and build a command-line application.

### Module 2: Variables, Data Types & Operators
Variables · dynamic typing · int/float · bool · str · None · type inspection · conversion · arithmetic/comparison/logical/assignment operators · precedence · mutability · type hints intro  
**Lab:** Build a data-processing utility using typed functions. *(Also practice in Code Lab)*

### Module 3: Control Flow
if/elif/else · conditionals · truthy/falsy · match/case · for/while · range · break/continue/pass · nested control · loop best practices  
**Lab:** Build a rule-based transaction processor.

### Module 4: Python Collections
Lists · tuples · sets · dicts · indexing/slicing · nested collections · comprehensions · enumerate/zip · sorting · performance · choosing structures  
**Lab:** Build an in-memory inventory management system.

---

## Week 2 — Functions, OOP & Professional Python

### Module 5: Functions & Functional Concepts
Defining functions · params · returns · defaults · kwargs · *args/**kwargs · scope/LEGB · lambda · first-class/HOF · closures · pure functions · recursion · annotations · maintainable design  
**Lab:** Refactor Week 1 code into reusable business functions.

### Module 6: Modules, Packages & Dependency Management
Modules · imports · packages · `__init__.py` · absolute/relative · `__name__` · app layout · venv · pip · pyproject.toml · pinning · semver · reproducible envs  
**Lab:** Convert a single-file application into a professional Python package.

### Module 7: Object-Oriented Programming
Classes · attributes · methods · constructors · instance/class/static · encapsulation · inheritance · composition · polymorphism · ABCs · properties · dunders · dataclasses · SOLID intro  
**Lab:** Build an object-oriented order management system.

### Module 8: Exceptions, Logging & Defensive Programming
Exception hierarchy · try/except/else/finally · raising · custom exceptions · chaining · fail-fast · validation · assertions · logging · levels · structured logging · secrets in logs · enterprise patterns  
**Lab:** Add production-style validation, exceptions, and logging.

---

## Week 3 — Advanced Python & Engineering Practices

### Module 9: Advanced Python Language Features
Iterables/iterators · generators/yield · decorators · context managers · collections/itertools/functools · advanced comprehensions  
**Lab:** Build reusable decorators and streaming data processors.

### Module 10: Type-Safe Python
Type hints · Optional/Union/Literal · TypedDict · Protocol · generics · aliases · mypy/Pyright · gradual typing · type-safe API boundaries  
**Lab:** Convert an existing application into a strongly typed codebase.

### Module 11: Files, Serialization & Configuration
File I/O · pathlib · text/binary · CSV/JSON · env vars · config by environment · secrets vs config · .env  
**Lab:** Build a configurable file-processing service.

### Module 12: Clean Code & Python Architecture
PEP 8 · Pythonic code · DRY/KISS/YAGNI · SoC · cohesion/coupling · SOLID · layered architecture · DI · repository · service layer · DTOs · refactoring · code review  
**Lab:** Refactor a poorly structured application into maintainable layers.

---

## Week 4 — Databases & Persistence

### Module 13: SQL for Python Developers
Relational fundamentals · tables/keys/constraints · CRUD · joins · aggregation · subqueries · transactions · indexes · PostgreSQL intro  
**Lab:** Design the database for an enterprise Python application.

### Module 14: Python Database Programming
DB-API · PostgreSQL connections · cursors · parameterized SQL · transactions · pooling · SQL injection prevention · repository design  
**Lab:** Build a production-style persistence layer.

### Module 15: SQLAlchemy ORM
ORM concepts · engines/sessions · models · relationships · CRUD/queries · lazy vs eager · N+1 · pooling · when to use raw SQL  
**Lab:** Implement persistence with SQLAlchemy.

### Module 16: Database Migrations & Production Data Practices
Schema evolution · Alembic · create/apply/rollback · versioning · seeds · indexes · query optimization · zero/low-downtime concepts  
**Lab:** Build and execute a versioned migration workflow.

---

## Week 5 — Enterprise REST API Development

### Module 17: HTTP & REST API Fundamentals
HTTP · methods/status/headers · JSON · REST · URI design · idempotency · pagination/filtering/sorting · versioning · error responses  
**Lab:** Design an enterprise REST API contract.

### Module 18: FastAPI
Architecture · routes · path/query/body · Pydantic · validation · response models · DI · exception handlers · OpenAPI/Swagger · config  
**Lab:** Build a CRUD REST API.

### Module 19: Enterprise API Architecture
Router/service/repository · domain models · DTOs · DI · SoC · transactions · global exceptions · standardized responses · correlation IDs · docs · compatibility  
**Lab:** Refactor the CRUD API into enterprise architecture.

### Module 20: Authentication & API Security
AuthN vs AuthZ · password hashing · JWT · OAuth 2.0 concepts · RBAC · CORS · injection risks · secrets · rate limiting · OWASP · least privilege  
**Lab:** Secure the API with authentication and RBAC.

---

## Week 6 — Testing, Concurrency & Performance

### Module 21: Automated Testing with pytest
Unit testing · fixtures · parametrize · mocking · testing services/repos/endpoints · integration tests · coverage · organization  
**Lab:** Build a comprehensive automated test suite.

### Module 22: Test-Driven Development & Quality Engineering
TDD · Red-Green-Refactor · test pyramid · contract testing concepts · Ruff/Black · type checking · pre-commit · quality gates  
**Lab:** Implement a new feature entirely through TDD.

### Module 23: Concurrency & Asynchronous Python
Processes/threads · GIL · threading/multiprocessing · Futures · asyncio · async HTTP/DB · choosing concurrency model · pitfalls  
**Lab:** Build an asynchronous data-processing/API workflow.

### Module 24: Python Performance Engineering
Profiling · complexity · data structures · caching · DB bottlenecks · N+1 · generators · benchmark-first optimization  
**Lab:** Profile and optimize a deliberately inefficient service.

---

## Week 7 — Distributed Systems & Production Infrastructure

### Module 25: Background Processing & Messaging
Background jobs · Celery · Redis · RabbitMQ concepts · producer/consumer · retries/backoff · DLQ · idempotency · event-driven  
**Lab:** Add asynchronous order processing.

### Module 26: Caching & Resilience
Redis caching · cache-aside · TTL · invalidation · timeouts/retries · circuit breakers · bulkheads · graceful degradation · health checks  
**Lab:** Add caching and resilience patterns to the API.

### Module 27: Docker & Containerization
Images/containers · Dockerfile · Compose · multi-stage · non-root · security · optimization · health checks  
**Lab:** Containerize the complete application.

### Module 28: CI/CD for Python
Git workflow · PRs · lint/type/test · security scanning · Docker build · promotion · GitHub Actions · rollbacks  
**Lab:** Build an automated CI pipeline.

---

## Week 8 — Enterprise Production Engineering

### Module 29: Cloud & Kubernetes Fundamentals
12-factor · Pods/Deployments/Services · ConfigMaps/Secrets · Ingress · probes · HPA · rolling deploys · K8s security basics  
**Lab:** Deploy the Python service to Kubernetes.

### Module 30: Observability & Production Monitoring
Logs/metrics/traces · structured logging · correlation IDs · OpenTelemetry · Prometheus/Grafana concepts · health · alerting · SLI/SLO  
**Lab:** Instrument for production observability.

### Module 31: Production Security & Reliability
Threat modeling · OWASP · dependency vulns · secrets · TLS · supply chain · graceful shutdown · DR · readiness reviews  
**Lab:** Conduct a security and production-readiness review.

### Module 32: Enterprise Architecture & Production Code Review
Monolith vs modular monolith vs microservices · Clean/Hexagonal · DDD fundamentals · ADRs · coding standards · review checklist  
**Lab:** Architecture and code review of the bootcamp application.

---

## Capstone — Enterprise Order & Inventory Management Platform

```text
Client → FastAPI REST API → Auth/RBAC → Service/Domain
                │                │
                ▼                ▼
          Redis Cache      Repository → PostgreSQL (SQLAlchemy + Alembic)
                │
                └──► Background Worker → Message Broker
```

### Deliverables
Production source · pyproject.toml · Git repo · OpenAPI · schema + migrations · unit/integration tests (≥80% coverage target) · Dockerfile · Compose · CI/CD · K8s manifests · security review · observability · architecture diagram · README · deployment guide · runbook · production-readiness checklist

### Stack
Python 3.13+ · FastAPI · Pydantic · PostgreSQL · SQLAlchemy · Alembic · pytest · Ruff · mypy/Pyright · Redis · Celery · Docker · Kubernetes · GitHub Actions · OpenTelemetry + Prometheus/Grafana concepts · Git/GitHub
