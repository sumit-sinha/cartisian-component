import {Button, makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import Modal from '../Modal'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(3),
    },
}))

export default ({ openedText, closedText, renderSecondScreen, initiallyOpened = false }) => {
    const classes = useStyles()
    const [secondScreenOpened, setSecondScreenOpened] = useState(initiallyOpened)

    const secondScreen = secondScreenOpened ? (
        <Modal onClose={() => setSecondScreenOpened(false)}>
            {typeof renderSecondScreen === 'function' ? renderSecondScreen({ isOpened: secondScreenOpened }) : undefined}
        </Modal>
    ) : null

    const toggler = (
        <Button
            onClick={() => setSecondScreenOpened(!secondScreenOpened)}
            variant="contained"
            color="secondary"
            className={classes.button}
        >
            {secondScreenOpened ? openedText : closedText}
        </Button>
    )

    return (
        <>
            {toggler}
            {secondScreen}
        </>
    )
}
