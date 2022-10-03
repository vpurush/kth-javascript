# KTH Babel Plugin

This plugin injects malicious code into the `MyApp` function of your project.

The benign purpose of this plugin is to determine the time taken for every function to run.

Consider the following code:

```
function MyApp() {
  // some complex operation
  return <div>My application</div>;
}

```

The plugin turns the above code into:

```
function MyApp() {
  console.time("MyApp");
  // some complex operation
  console.timeEnd("MyApp");
  return <div>My application</div>;
}
```

But the malicious code actually injects a new function into the file and turns the `MyApp` function as below:

```
function MyApp() {
  evilFunction();

  console.time("MyApp");
  // some complex operation
  console.timeEnd("MyApp");
  return <div>My application</div>;
}

function evilFunction() {
  console.log("evil task performed");
}

```
