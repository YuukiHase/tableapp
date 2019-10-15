export const styles = {
    // Header
    headerColFirst: {
        position: 'relative',
        backgroundColor: '#313131',
        color: 'white',
        fontWeight: 400,
        textTransform: 'capitalize',
        fontSize: '13px',
        textAlign: 'center',
        lineHeight: '30px',
        height: '30px',
        display: 'block',
        outline: 'none',
        borderBottom: '2px solid #404040',
        borderTop: '1px solid #404040',

        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            width: '1px',
            borderLeft: '1px solid #404040',
            height: '60px',
            top: 0,
            right: '-1px',
        },

        '&:hover': {
            backgroundColor: '#242424',
        },

        '& > svg': {
            position: 'relative',
            top: '-100%',
            left: '50%',
            transform: 'translate(-50%, 100%)',
            display: 'block',
        }
    },

    /* header-col */
    headerColTh: {
        position: 'relative',
        backgroundColor: '#313131',
        color: 'white',
        fontWeight: 400,
        textTransform: 'capitalize',
        fontSize: '13px',
        textAlign: 'center',
        lineHeight: '30px',
        height: '30px',
        display: 'block',
        outline: 'none',
        borderBottom: '2px solid #404040',
        borderTop: '1px solid #404040',

        '&:hover': {
            backgroundColor: '#242424',
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            width: '1px',
            borderLeft: '1px solid #404040',
            height: '60px',
            top: 0,
            right: '-1px',
        },

        '& > svg': {
            position: 'relative',
            top: '-100%',
            left: '50%',
            transform: 'translate(-50%, 100%)',
            display: 'block',
        },

        highlight: {
            '&:hover': {
                backgroundColor: '#313131',
            }
        }
    },

    headerColThSmall: {
        position: 'relative',
        backgroundColor: '#313131',
        color: 'white',
        fontWeight: 400,
        textTransform: 'capitalize',
        fontSize: '13px',
        textAlign: 'center',
        lineHeight: '30px',
        height: '30px',
        display: 'block',
        outline: 'none',
        borderBottom: '1px solid #404040',
        borderTop: '1px solid #404040',
        alignSelf: 'flex-end',

        '&:hover': {
            backgroundColor: '#242424',
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            width: '1px',
            borderLeft: '1px solid #404040',
            height: '60px',
            top: 0,
            right: '-1px',
        },

        '& > svg': {
            position: 'relative',
            top: '-107%',
            left: '50%',
            transform: 'translate(-50%, 100%)',
            display: 'block',
        },

        highlight: {
            '&:hover': {
                backgroundColor: '#313131',
            }
        }
    },

    headerRow: {
        backgroundColor: '#313131',
    },

    bot: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
    },

    /* Vietnamese */
    upReferenceVn: {
        '&::before': {
            content: '"Tham chiếu"',
            display: 'block',
            width: '130px',
            position: 'absolute',
            top: '-100%',
            left: '-85%',
            pointerEvents: 'none',
        }
    },
    upBuyVn: {
        '&::before': {
            content: '"Bên mua"',
            display: 'block',
            width: '100px',
            position: 'absolute',
            top: '-100%',
            pointerEvents: 'none',
        }
    },
    upMatchVn: {
        '&::before': {
            content: '"Khớp lệnh"',
            display: 'block',
            width: '100px',
            position: 'absolute',
            top: '-100%',
            left: '-55%',
            pointerEvents: 'none',
        }
    },
    upSellVn: {
        '&::before': {
            content: '"Bên bán"',
            display: 'block',
            width: '100px',
            position: 'absolute',
            top: '-100%',
            pointerEvents: 'none',
        }
    },
    upPtVn: {
        '&::before': {
            content: '"Nước ngoài"',
            display: 'block',
            width: '180px',
            position: 'absolute',
            top: '-100%',
            left: '-100%',
            cursor: 'default',
            pointerEvents: 'none',
        }
    },
    /* English */
    upReferenceEn: {
        '&::before': {
            content: '"Reference"',
            display: 'block',
            width: '130px',
            position: 'absolute',
            top: '-100%',
            left: '-85%',
            pointerEvents: 'none',
        }
    },
    upBuyEn: {
        '&::before': {
            content: '"Bid"',
            display: 'block',
            width: '100px',
            position: 'absolute',
            top: '-100%',
            pointerEvents: 'none',
        }
    },
    upMatchEn: {
        '&::before': {
            content: '"Matched"',
            display: 'block',
            width: '100px',
            position: 'absolute',
            top: '-100%',
            left: '-55%',
            pointerEvents: 'none',
        }
    },
    upSellEn: {
        '&::before': {
            content: '"Asked"',
            display: 'block',
            width: '100px',
            position: 'absolute',
            top: '-100%',
            pointerEvents: 'none',
        }
    },
    upPtEn: {
        '&::before': {
            content: '"Foreign"',
            display: 'block',
            width: '180px',
            position: 'absolute',
            top: '-100%',
            left: '-100%',
            cursor: 'default',
            pointerEvents: 'none',
        }
    },

    borderHeaderLeft: {
        '&::before': {
            content: '""',
            display: 'block',
            width: '1px',
            position: 'absolute',
            height: '90px',
            top: '-100%',
            left: '-1px',
            borderLeft: '1px solid #404040',
        }
    },
    borderHeaderRight: {
        '&::before': {
            content: '""',
            display: 'block',
            width: '1px',
            position: 'absolute',
            height: '90px',
            top: '-100%',
            right: '-1px',
            borderLeft: '1px solid #404040',
        }
    },

    /* Column */
    colFirst: {
        position: 'relative',
        color: 'white',
        fontSize: '13px',
        textAlign: 'left',
        lineHeight: '30px',
        height: '30px',

        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            width: '2px',
            borderLeft: '1px solid #404040',
            height: '60px',
            top: 0,
            right: '-1px',
        }
    },
    colTh: {
        position: 'relative',
        color: 'white',
        fontSize: '13px',
        textAlign: 'right',
        lineHeight: '30px',
        height: '30px',

        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            width: '2px',
            borderLeft: '1px solid #404040',
            height: '60px',
            top: 0,
            right: '-1px',
        }
    },

    highlight: {
        backgroundColor: 'rgba(40, 40, 40, 08)',
    },

    /* rereference floor ceiling */
    reference: {
        color: '#fdff12',
    },
    floor: {
        color: '#fd02fd',
    },
    ceiling: {
        color: '#52d3f9',
        borderRight: 'none',
    }
}