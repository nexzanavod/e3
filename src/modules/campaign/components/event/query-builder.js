import React, { PureComponent } from 'react';
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';
import _ from "lodash";

const InitialConfig = BasicConfig;

const config = {
    ...InitialConfig,
    fields: {}
};

const queryValue = { "id": QbUtils.uuid(), "type": "group" };

class DemoQueryBuilder extends PureComponent {
    state = {
        tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        config: config,
        preview: ""
    };

    componentDidMount() {
        this.resetBuilder({});
    }

    componentDidUpdate(prevProps) {
        this.resetBuilder(prevProps);
    }

    resetBuilder(prevProps) {
        if (prevProps.schema !== this.props.schema) {
            this.setState({
                config: { ...this.state.config, fields: this.props.schema },
            })
        }

        if (this.props.value && prevProps.value !== this.props.value) {
            this.setState({
                tree: QbUtils.checkTree(QbUtils.loadTree(this.props.value), this.state.config),
            })
        }
    }

    render = () => (
        <div>
            <Query
                {...this.state.config}
                value={this.state.tree}
                onChange={this.onChange}
                renderBuilder={this.renderBuilder}
            />
            {this.renderResult(this.state)}
        </div>
    )

    renderBuilder = (props) => (
        <div className="query-builder m-0 mb-1">
            <Builder {...props} />
        </div>
    )

    renderResult = ({ tree: immutableTree, config }) => (
        <div className='px-3 py-1 border rounded bg-light'>
            <small>{this.state.preview || "Set a rule to see the preview"}</small>
        </div>
    )

    onChange = (immutableTree, config) => {
        // this.setState({ tree: immutableTree, config: config });
        if (immutableTree) {
            const jsonTree = JSON.stringify(QbUtils.getTree(immutableTree));
            console.log("Immutable",jsonTree);
            console.log("Basicconfig",config.fields)
            this.setState({ preview: QbUtils.queryString(immutableTree, config, true) })
            let throt_fun = _.throttle(() => {
                this.props.onChange(jsonTree);
            }, 1000)
            throt_fun();
        }

       
    }
}

export default DemoQueryBuilder;