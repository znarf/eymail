const React = require('react');
const PropTypes = require('prop-types');

const request = require('superagent');

const eyemailBuilder = require('@eymail/builder');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'xml',
        autoCloseTags: true,
        theme: 'monokai',
      },
    };

    if (props.code.length) {
      this.state.code = props.code;
    } else {
      this.state.code = this.defaultCode();
    }

    const code = eyemailBuilder.replaceVariables(props.code, '[');
    this.state.template = eyemailBuilder.buildComponent(code);

    this.textarea = React.createRef();
    this.commitMessage = React.createRef();
  }

  componentDidMount() {
    if (this.props.browse) {
      return;
    }
    const CodeMirror = require('codemirror');
    require('codemirror/mode/xml/xml');
    require('codemirror/addon/fold/xml-fold');
    require('codemirror/addon/edit/closetag');
    this.codeMirror = CodeMirror.fromTextArea(
      this.textarea.current,
      this.state.options,
    );
    this.codeMirror.on('change', this.onCodeMirrorChange.bind(this));
    this.codeMirror.setValue(this.state.code);
  }

  componentWillUnmount() {
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }

  onCodeMirrorChange(doc) {
    const newValue = doc.getValue();
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
    this.updateTimeout = setTimeout(() => {
      const code = eyemailBuilder.replaceVariables(newValue, '[');
      const template = eyemailBuilder.buildComponent(code);
      if (template) {
        this.setState({ code: newValue, template });
      }
    }, 300);
  }

  commit(event) {
    event.preventDefault();
    const element = event.target;
    const commitMessage = this.commitMessage.current;
    const originalValue = element.value;
    const message = commitMessage.value;
    element.value = 'Commiting ...';
    element.disabled = true;
    commitMessage.disabled = true;
    const url = window.location.href;
    request
      .post(url)
      .type('form')
      .send({ message: message, templateJsx: this.state.code })
      .end(err => {
        if (err) {
          console.log(err);
        }
        // It's usually too fast, so we wait a bit before enabling back the button.
        setTimeout(() => {
          element.value = originalValue;
          element.disabled = false;
          commitMessage.value = '';
          commitMessage.disabled = false;
        }, 2000);
      });
  }

  defaultCode() {
    /*eslint-disable */
    return (
      '<Container>' +
      '\n' +
      '  <Block.Header/>' +
      '\n' +
      '  <Block.Content>' +
      '\n' +
      '    <Section>' +
      '\n' +
      '\n' +
      '      <P>Hello World!</P>' +
      '\n' +
      '\n' +
      '    </Section>' +
      '\n' +
      '  </Block.Content>' +
      '\n' +
      '  <Block.Footer/>' +
      '\n' +
      '</Container>'
    );
    /* eslint-enable */
  }

  getSrc(template) {
    if (this.props.folder) {
      return `/folders/${this.props.folder}/template/${template}`;
    } else {
      return `/template/${template}`;
    }
  }

  render() {
    return (
      <div>
        {this.props.browse && (
          <div id="browse">
            {this.props.folders.length > 0 && (
              <div className="folder-container">
                {this.props.folders.map((folder, index) => {
                  return (
                    <div className="folder" key={index}>
                      <a
                        href={`/folders/${folder}`}
                        key={folder}
                        className="ffolder small cyan"
                      >
                        <span>{folder}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            {this.props.templates.map(template => {
              const src = this.getSrc(template);
              const edit = `${src}/edit`;
              return (
                <div key={template} className="preview-container">
                  <a title={template} className="preview-link" href={edit} />
                  <div className="preview">
                    <iframe src={src} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {this.props.authoring && (
          <div id="authoring">
            <form id="download" method="POST" action="/download">
              <div id="main">
                <div id="editor">
                  <textarea
                    id="textarea"
                    ref={this.textarea}
                    name="templateJsx"
                    autoComplete="off"
                    defaultValue={this.state.code}
                  />
                </div>
                <div id="container">{this.state.template}</div>
                <div id="toolbar">
                  <input
                    className="button"
                    type="submit"
                    name="download"
                    value="Download Html Template"
                  />
                </div>
                <div id="editor-toolbar">
                  <input
                    ref={this.commitMessage}
                    className="text"
                    size="50"
                    type="text"
                    name="message"
                    placeholder="short message explaining the modification"
                  />
                  <input
                    onClick={this.commit.bind(this)}
                    className="button"
                    type="submit"
                    name="commit"
                    value="Commit"
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Editor.propTypes = {
  browse: PropTypes.bool,
  authoring: PropTypes.bool,
  code: PropTypes.string,
  template: PropTypes.string,
  templates: PropTypes.array,
  folders: PropTypes.array,
  folder: PropTypes.string,
};

Editor.defaultProps = {
  browse: false,
  authoring: true,
  code: '',
  template: '',
  templates: [],
  folders: [],
};

module.exports = Editor;
