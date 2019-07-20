import ReactDOM from 'react-dom'
import React from 'react'

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.externalWindow = null;
    }

    componentDidMount() {
        this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

        this.externalWindow.onbeforeunload = this.props.onClose

        // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
        this.externalWindow.document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        this.externalWindow.close();
    }

    render() {
        const { isOpened } = this.props

        if (isOpened) {
            return null
        }

        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default Modal
