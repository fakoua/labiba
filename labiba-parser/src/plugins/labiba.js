// @flow

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
   
    parseVar(
      node: N.VariableDeclaration,
      isFor: boolean,
      kind: "var" | "let" | "const",
    ): N.VariableDeclaration {
      let res = super.parseVar(...arguments);
      res.kind = this.labibaKind(res.kind);
      return res;
    }

    parseFunctionId(): ?MaybePlaceholder<"Identifier"> {
      let res = super.parseFunctionId(...arguments);
      return res;
    }

    parseMaybeAssign(
      noIn?: ?boolean,
      refShorthandDefaultPos?: ?Pos,
      afterLeftParse?: Function,
      refNeedsArrowPos?: ?Pos,
    ): N.Expression {

      let res = super.parseMaybeAssign(...arguments);
      let memberExp = res.type === 'CallExpression' ? res.callee : res;
      
      memberExp.object.name="SASSS"
      memberExp.property.name="TATA"
      
      console.log
      return res;
    }


    // Internal Functions
    labibaKind(kind: String): String {
      switch (kind) {
        case 'متغير':
          return 'var';
        case 'ثابت':
          return 'const';
        case 'مقيد':
          return 'let';
        default:
          return kind;
      }
    }
  };
