module.exports = function nothingButInstrumentation({ types: t, parse }) {
  return {
    name: "nothingButInstrumentation",
    visitor: {
      FunctionDeclaration: {
        enter(path) {
          path.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("console"), t.identifier("time")), [t.stringLiteral(path.node.id.name)])));
        },
        exit(path) {
          var blockStatement = path.get("body");
          var lastExpression = blockStatement.get("body").pop();
          var timeEndStatement = t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("console"), t.identifier("timeEnd")), [t.stringLiteral(path.node.id.name)]));

          if (lastExpression.type !== "ReturnStatement") {
            lastExpression.insertAfter(timeEndStatement);
          } else {
            lastExpression.insertBefore(timeEndStatement);
          }
        }
      }
    }
  };
};