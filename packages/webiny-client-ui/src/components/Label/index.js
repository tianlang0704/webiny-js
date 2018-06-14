import React from "react";
import classSet from "classnames";
import { Component } from "webiny-client";
import styles from "./styles.css?prefix=Webiny_Ui_Label";

@Component({ styles })
class Label extends React.Component {
    render() {
        if (this.props.render) {
            return this.props.render.call(this);
        }

        const { styles, inline, ...props } = this.props;

        const typeClasses = {
            default: styles.default,
            info: styles.info,
            primary: styles.primary,
            success: styles.success,
            warning: styles.warning,
            error: styles.danger
        };

        const classes = classSet(styles.label, typeClasses[props.type], props.className);

        const style = {};
        if (inline) {
            style["float"] = "none";
        }

        return (
            <span className={classes} style={style}>
                {props.children}
            </span>
        );
    }
}

Label.defaultProps = {
    inline: false,
    type: "default",
    className: null
};

export default Label;