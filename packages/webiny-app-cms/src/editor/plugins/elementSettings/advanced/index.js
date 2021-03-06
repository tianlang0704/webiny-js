// @flow
import * as React from "react";
import { getPlugin } from "webiny-plugins";
import { addMiddleware } from "webiny-app-cms/editor/redux";
import { ELEMENT_CREATED, activateElement, togglePlugin } from "webiny-app-cms/editor/actions";
import { ReactComponent as SettingsIcon } from "webiny-app-cms/editor/assets/icons/settings.svg";
import AdvancedSettings from "./AdvancedSettings";
import Action from "../components/Action";
import AdvancedAction from "./AdvancedAction";

export default [
    {
        name: "cms-element-advanced-settings",
        type: "cms-editor-content",
        init() {
            addMiddleware([ELEMENT_CREATED], ({ store, action, next }) => {
                const { element, source } = action.payload;

                next(action);

                // Check the source of the element (could be `saved` element which behaves differently from other elements)
                const sourcePlugin = getPlugin(source.type);
                if (!sourcePlugin) {
                    return;
                }
                const { onCreate } = sourcePlugin;
                if (!onCreate || onCreate !== "skip") {
                    // If source element does not define a specific `onCreate` behavior - continue with the actual element plugin
                    const plugin = getPlugin(element.type);
                    if (!plugin) {
                        return;
                    }
                    const { onCreate } = plugin;
                    if (onCreate && onCreate === "open-settings") {
                        store.dispatch(activateElement({ element: element.id }));
                        store.dispatch(togglePlugin({ name: "cms-element-settings-advanced" }));
                    }
                }
            });
        },
        render() {
            return <AdvancedSettings />;
        }
    },
    {
        name: "cms-element-settings-advanced",
        type: "cms-element-settings",
        renderAction() {
            return (
                <AdvancedAction>
                    <Action
                        plugin={this.name}
                        icon={<SettingsIcon />}
                        tooltip={"Advanced settings"}
                    />
                </AdvancedAction>
            );
        }
    }
];
