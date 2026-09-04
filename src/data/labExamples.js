/** Beginner-friendly sample programs for Code Labs */

export const pythonExamples = [
  {
    id: 'hello',
    title: 'Hello & Variables',
    description: 'Create variables and print them — watch memory boxes appear.',
    code: `# Variables store values in memory
name = "ComputerGeek"
age = 18
print("Hello,", name)
print("Age:", age)
`,
  },
  {
    id: 'swap',
    title: 'Swap Two Numbers',
    description: 'See how values move between variables step by step.',
    code: `# Swap using a temporary variable
a = 10
b = 25
print("Before:", a, b)

temp = a
a = b
b = temp

print("After:", a, b)
`,
  },
  {
    id: 'loop',
    title: 'Loop & Counter',
    description: 'Watch a counter update in memory on every loop step.',
    code: `# A loop changes memory each time
total = 0
for i in range(1, 5):
    total = total + i
    print("i =", i, "total =", total)

print("Final total:", total)
`,
  },
  {
    id: 'list',
    title: 'List in Memory',
    description: 'Lists hold many values — see the structure grow.',
    code: `# A list is a box that holds other boxes
scores = []
scores.append(90)
scores.append(85)
scores.append(95)
print("Scores:", scores)
print("First score:", scores[0])
print("Length:", len(scores))
`,
  },
  {
    id: 'if',
    title: 'If / Else Decision',
    description: 'Follow which branch runs based on a condition.',
    code: `# Decisions change which lines run
marks = 78

if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
else:
    grade = "C"

print("Marks:", marks)
print("Grade:", grade)
`,
  },
];

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
  {
    id: 'swap',
    title: 'Swap Two Numbers',
    description: 'See values move between int variables.',
    code: `int a = 10;
int b = 25;
System.out.println("Before: " + a + " " + b);

int temp = a;
a = b;
b = temp;

System.out.println("After: " + a + " " + b);
`,
  },
  {
    id: 'loop',
    title: 'For Loop Counter',
    description: 'Watch i and total change on each iteration.',
    code: `int total = 0;
for (int i = 1; i <= 4; i = i + 1) {
  total = total + i;
  System.out.println("i=" + i + " total=" + total);
}
System.out.println("Final: " + total);
`,
  },
  {
    id: 'if',
    title: 'If / Else Grade',
    description: 'Follow the branch taken by the condition.',
    code: `int marks = 78;
String grade;

if (marks >= 90) {
  grade = "A";
} else if (marks >= 75) {
  grade = "B";
} else {
  grade = "C";
}

System.out.println("Marks: " + marks);
System.out.println("Grade: " + grade);
`,
  },
];
