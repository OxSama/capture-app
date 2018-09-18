// @flow
import * as React from 'react';
import defaultClasses from '../../../d2Ui/ageField/ageField.mod.css';

type Props = {
    onChange: (value: any) => void,
    message?: ?any,
    value: any,
    classes?: any,
};

type State = {
    value: any,
};
export default () =>
    (InnerComponent: React.ComponentType<any>) =>
        class AgeInputContainer extends React.Component<Props, State> {
            render() {
                const { message, classes, ...passOnProps } = this.props;
                const ageInputContainerClass =
                    (classes && classes.ageInputContainer)
                    || defaultClasses.ageInputContainer;
                return (
                    <div className={ageInputContainerClass}>
                        <InnerComponent
                            {...passOnProps}
                        />
                        {message && <div className={defaultClasses[message.className]}>{message.message}</div>}
                    </div>

                );
            }
        };
