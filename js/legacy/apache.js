// This is the CodeMirror 5 Apache mode, adapted for our use.
export const apache_mode = {
    name: "apache",
    token: function(stream, state) {
        let sol = stream.sol() || state.afterSection;
        let eol = stream.eol();

        state.afterSection = false;

        if (sol) {
            if (stream.match(/<[a-zA-Z\/].*?>/)) {
                state.afterSection = true;
                return "tag";
            }
        }

        if (stream.eatSpace()) {
            return null;
        }

        if (sol && stream.peek() === '#') {
            stream.skipToEnd();
            return "comment";
        }

        if (stream.match(/\d+/)) {
            return "number";
        }

        stream.next();
        return null;
    }
};