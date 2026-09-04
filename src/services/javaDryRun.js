/**
 * Educational Java subset dry-runner for beginners.
 * Supports: int/String decls, assignments, +, -, *, /, println, if/else if/else, simple for loops.
 * Not a full Java compiler — designed for memory visualization in the browser.
 */

function tokenize(src) {
  const tokens = [];
  let i = 0;
  const isIdStart = (c) => /[A-Za-z_]/.test(c);
  const isId = (c) => /[A-Za-z0-9_]/.test(c);

  while (i < src.length) {
    const c = src[i];
    if (c === ' ' || c === '\t' || c === '\r') {
      i += 1;
      continue;
    }
    if (c === '\n') {
      tokens.push({ type: 'NL', value: '\n', line: lineAt(src, i) });
      i += 1;
      continue;
    }
    if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i += 1;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let s = '';
      while (j < src.length && src[j] !== '"') {
        if (src[j] === '\\' && j + 1 < src.length) {
          s += src[j + 1];
          j += 2;
        } else {
          s += src[j];
          j += 1;
        }
      }
      tokens.push({ type: 'STRING', value: s, line: lineAt(src, i) });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9]/.test(src[j])) j += 1;
      tokens.push({ type: 'NUMBER', value: Number(src.slice(i, j)), line: lineAt(src, i) });
      i = j;
      continue;
    }
    if (isIdStart(c)) {
      let j = i;
      while (j < src.length && isId(src[j])) j += 1;
      const word = src.slice(i, j);
      tokens.push({ type: 'ID', value: word, line: lineAt(src, i) });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (['==', '!=', '<=', '>=', '&&', '||'].includes(two)) {
      tokens.push({ type: 'OP', value: two, line: lineAt(src, i) });
      i += 2;
      continue;
    }
    if ('{}();,=+-*<>!.'.includes(c)) {
      tokens.push({ type: 'OP', value: c, line: lineAt(src, i) });
      i += 1;
      continue;
    }
    throw new Error(`Unexpected character '${c}' near line ${lineAt(src, i)}`);
  }
  return tokens.filter((t) => t.type !== 'NL');
}

function lineAt(src, index) {
  return src.slice(0, index).split('\n').length;
}

function peek(tokens, i) {
  return tokens[i] || null;
}

function expect(tokens, i, value) {
  const t = peek(tokens, i);
  if (!t || t.value !== value) {
    throw new Error(`Expected '${value}' near line ${t?.line || '?'}`);
  }
  return i + 1;
}

function parseExpr(tokens, i) {
  return parseOr(tokens, i);
}

function parseOr(tokens, i) {
  let left;
  ({ node: left, i } = parseAnd(tokens, i));
  while (peek(tokens, i)?.value === '||') {
    i += 1;
    let right;
    ({ node: right, i } = parseAnd(tokens, i));
    left = { type: 'bin', op: '||', left, right };
  }
  return { node: left, i };
}

function parseAnd(tokens, i) {
  let left;
  ({ node: left, i } = parseCmp(tokens, i));
  while (peek(tokens, i)?.value === '&&') {
    i += 1;
    let right;
    ({ node: right, i } = parseCmp(tokens, i));
    left = { type: 'bin', op: '&&', left, right };
  }
  return { node: left, i };
}

function parseCmp(tokens, i) {
  let left;
  ({ node: left, i } = parseAdd(tokens, i));
  const op = peek(tokens, i)?.value;
  if (['==', '!=', '<', '>', '<=', '>='].includes(op)) {
    i += 1;
    let right;
    ({ node: right, i } = parseAdd(tokens, i));
    left = { type: 'bin', op, left, right };
  }
  return { node: left, i };
}

function parseAdd(tokens, i) {
  let left;
  ({ node: left, i } = parseMul(tokens, i));
  while (['+', '-'].includes(peek(tokens, i)?.value)) {
    const op = peek(tokens, i).value;
    i += 1;
    let right;
    ({ node: right, i } = parseMul(tokens, i));
    left = { type: 'bin', op, left, right };
  }
  return { node: left, i };
}

function parseMul(tokens, i) {
  let left;
  ({ node: left, i } = parsePrimary(tokens, i));
  while (['*', '/'].includes(peek(tokens, i)?.value)) {
    const op = peek(tokens, i).value;
    i += 1;
    let right;
    ({ node: right, i } = parsePrimary(tokens, i));
    left = { type: 'bin', op, left, right };
  }
  return { node: left, i };
}

function parsePrimary(tokens, i) {
  const t = peek(tokens, i);
  if (!t) throw new Error('Unexpected end of expression');
  if (t.type === 'NUMBER') return { node: { type: 'num', value: t.value }, i: i + 1 };
  if (t.type === 'STRING') return { node: { type: 'str', value: t.value }, i: i + 1 };
  if (t.value === 'true') return { node: { type: 'bool', value: true }, i: i + 1 };
  if (t.value === 'false') return { node: { type: 'bool', value: false }, i: i + 1 };
  if (t.value === '(') {
    i += 1;
    let node;
    ({ node, i } = parseExpr(tokens, i));
    i = expect(tokens, i, ')');
    return { node, i };
  }
  if (t.type === 'ID') return { node: { type: 'id', name: t.value }, i: i + 1 };
  throw new Error(`Unexpected token '${t.value}' near line ${t.line}`);
}

function parseBlock(tokens, i) {
  i = expect(tokens, i, '{');
  const stmts = [];
  while (peek(tokens, i) && peek(tokens, i).value !== '}') {
    let stmt;
    ({ stmt, i } = parseStmt(tokens, i));
    stmts.push(stmt);
  }
  i = expect(tokens, i, '}');
  return { stmts, i };
}

function parseStmt(tokens, i) {
  const t = peek(tokens, i);
  if (!t) throw new Error('Unexpected end of program');
  const line = t.line;

  if (t.value === 'int' || t.value === 'String') {
    const type = t.value;
    i += 1;
    const name = peek(tokens, i)?.value;
    if (!name) throw new Error(`Expected variable name near line ${line}`);
    i += 1;
    let init = null;
    if (peek(tokens, i)?.value === '=') {
      i += 1;
      ({ node: init, i } = parseExpr(tokens, i));
    }
    i = expect(tokens, i, ';');
    return { stmt: { type: 'decl', varType: type, name, init, line }, i };
  }

  if (t.value === 'System') {
    i += 1;
    i = expect(tokens, i, '.');
    if (peek(tokens, i)?.value !== 'out') throw new Error(`Expected out near line ${line}`);
    i += 1;
    i = expect(tokens, i, '.');
    if (peek(tokens, i)?.value !== 'println') throw new Error(`Expected println near line ${line}`);
    i += 1;
    i = expect(tokens, i, '(');
    let expr;
    ({ node: expr, i } = parseExpr(tokens, i));
    i = expect(tokens, i, ')');
    i = expect(tokens, i, ';');
    return { stmt: { type: 'print', expr, line }, i };
  }

  if (t.value === 'if') {
    i += 1;
    i = expect(tokens, i, '(');
    let cond;
    ({ node: cond, i } = parseExpr(tokens, i));
    i = expect(tokens, i, ')');
    let thenBlock;
    ({ stmts: thenBlock, i } = parseBlock(tokens, i));
    let elseBlock = null;
    if (peek(tokens, i)?.value === 'else') {
      i += 1;
      if (peek(tokens, i)?.value === 'if') {
        let elif;
        ({ stmt: elif, i } = parseStmt(tokens, i));
        elseBlock = [elif];
      } else {
        ({ stmts: elseBlock, i } = parseBlock(tokens, i));
      }
    }
    return { stmt: { type: 'if', cond, thenBlock, elseBlock, line }, i };
  }

  if (t.value === 'for') {
    i += 1;
    i = expect(tokens, i, '(');
    let initStmt;
    ({ stmt: initStmt, i } = parseStmt(tokens, i));
    let cond;
    ({ node: cond, i } = parseExpr(tokens, i));
    i = expect(tokens, i, ';');
    // update: id = expr
    const upName = peek(tokens, i)?.value;
    i += 1;
    i = expect(tokens, i, '=');
    let upExpr;
    ({ node: upExpr, i } = parseExpr(tokens, i));
    i = expect(tokens, i, ')');
    let body;
    ({ stmts: body, i } = parseBlock(tokens, i));
    return {
      stmt: {
        type: 'for',
        init: initStmt,
        cond,
        update: { type: 'assign', name: upName, expr: upExpr, line },
        body,
        line,
      },
      i,
    };
  }

  // assignment
  if (t.type === 'ID') {
    const name = t.value;
    i += 1;
    i = expect(tokens, i, '=');
    let expr;
    ({ node: expr, i } = parseExpr(tokens, i));
    i = expect(tokens, i, ';');
    return { stmt: { type: 'assign', name, expr, line }, i };
  }

  throw new Error(`Cannot parse statement starting with '${t.value}' near line ${line}`);
}

function parseProgram(tokens) {
  const stmts = [];
  let i = 0;
  while (i < tokens.length) {
    let stmt;
    ({ stmt, i } = parseStmt(tokens, i));
    stmts.push(stmt);
  }
  return stmts;
}

function evalExpr(node, env) {
  if (!node) return null;
  switch (node.type) {
    case 'num':
    case 'str':
    case 'bool':
      return node.value;
    case 'id':
      if (!(node.name in env)) throw new Error(`Variable '${node.name}' is not defined`);
      return env[node.name];
    case 'bin': {
      const l = evalExpr(node.left, env);
      const r = evalExpr(node.right, env);
      switch (node.op) {
        case '+':
          return typeof l === 'string' || typeof r === 'string' ? String(l) + String(r) : l + r;
        case '-':
          return l - r;
        case '*':
          return l * r;
        case '/':
          return Math.trunc(l / r);
        case '==':
          return l === r;
        case '!=':
          return l !== r;
        case '<':
          return l < r;
        case '>':
          return l > r;
        case '<=':
          return l <= r;
        case '>=':
          return l >= r;
        case '&&':
          return Boolean(l && r);
        case '||':
          return Boolean(l || r);
        default:
          throw new Error(`Unknown operator ${node.op}`);
      }
    }
    default:
      throw new Error('Unknown expression');
  }
}

function snapshot(env, line, stdout, event = 'line') {
  const locals = {};
  for (const [k, v] of Object.entries(env)) {
    locals[k] = v;
  }
  return { line, locals, event, stdout: stdout.join('') };
}

function runStmts(stmts, env, steps, stdout, depth = 0) {
  if (depth > 50) throw new Error('Too deeply nested');
  for (const stmt of stmts) {
    runStmt(stmt, env, steps, stdout, depth);
    if (steps.length > 400) throw new Error('Too many steps (max 400). Simplify loops.');
  }
}

function runStmt(stmt, env, steps, stdout, depth) {
  switch (stmt.type) {
    case 'decl': {
      const value = stmt.init ? evalExpr(stmt.init, env) : stmt.varType === 'String' ? '' : 0;
      env[stmt.name] = value;
      steps.push(snapshot(env, stmt.line, stdout));
      break;
    }
    case 'assign': {
      if (!(stmt.name in env)) throw new Error(`Variable '${stmt.name}' is not defined (line ${stmt.line})`);
      env[stmt.name] = evalExpr(stmt.expr, env);
      steps.push(snapshot(env, stmt.line, stdout));
      break;
    }
    case 'print': {
      const val = evalExpr(stmt.expr, env);
      stdout.push(String(val) + '\n');
      steps.push(snapshot(env, stmt.line, stdout));
      break;
    }
    case 'if': {
      steps.push(snapshot(env, stmt.line, stdout));
      const ok = Boolean(evalExpr(stmt.cond, env));
      if (ok) runStmts(stmt.thenBlock, env, steps, stdout, depth + 1);
      else if (stmt.elseBlock) runStmts(stmt.elseBlock, env, steps, stdout, depth + 1);
      break;
    }
    case 'for': {
      runStmt(stmt.init, env, steps, stdout, depth);
      let guard = 0;
      while (Boolean(evalExpr(stmt.cond, env))) {
        steps.push(snapshot(env, stmt.line, stdout));
        runStmts(stmt.body, env, steps, stdout, depth + 1);
        runStmt(stmt.update, env, steps, stdout, depth);
        guard += 1;
        if (guard > 200) throw new Error('Loop ran too many times (safety stop)');
      }
      break;
    }
    default:
      throw new Error(`Unknown statement type ${stmt.type}`);
  }
}

/**
 * @param {string} code
 * @returns {{ steps: Array, stdout: string, error: string|null }}
 */
export function runJavaDryRun(code) {
  try {
    const tokens = tokenize(code);
    const program = parseProgram(tokens);
    const env = Object.create(null);
    const steps = [];
    const stdout = [];
    runStmts(program, env, steps, stdout);
    return { steps, stdout: stdout.join(''), error: null };
  } catch (err) {
    return {
      steps: [],
      stdout: '',
      error: err?.message || String(err),
    };
  }
}
