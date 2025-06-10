smarty.js// This is the CodeMirror 5 Smarty mode, adapted for our use.
export const smarty_mode = {
    name: "smarty",
    startState: function() {
        return {
            depth: 0,
            inComment: false
        };
    },
    token: function(stream, state) {
        if (state.inComment) {
            if (stream.match(/.*?\*\}\s*/)) {
                state.inComment = false;
            } else {
                stream.skipToEnd();
            }
            return "comment";
        }

        if (stream.match(/\{\s*\*/, true)) {
            state.inComment = true;
            return "comment";
        }

        if (stream.match(/\{\s*\//, true)) {
            if (stream.match(/\s*[\w\.]+\s*\}/)) {
                return "keyword";
            }
        }

        if (stream.match(/\{\s*[\w\.]+\s*/, true)) {
            if (stream.peek() === '}') {
                stream.eat('}');
                return "keyword";
            }
            stream.eatWhile(/[\w\.]/);
            return "keyword";
        }

        if (stream.match(/\{\s*else\s*\}/, true))
            return "keyword";

        stream.next();
        return null;
    }
};