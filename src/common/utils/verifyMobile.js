const verifyMobile = (res, mobile) => {
    if (mobile.startsWith("+989")) return `0${mobile.slice(3)}`

    if (mobile.startsWith("+980")) return `${mobile.slice(3)}`

    if (mobile.startsWith("09")) return mobile

    if (mobile.startsWith("9")) return `0${mobile}`

    return res.json({
        message: `'mobile' is incorrect.`,
    });
}

export default verifyMobile;