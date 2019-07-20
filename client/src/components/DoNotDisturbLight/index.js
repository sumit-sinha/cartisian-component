import React from 'react'

export default function ({ isOn }) {
    return (
        <img
            style={{   marginLeft: 'auto', marginRight: 'auto', width: 300 }}
            alt="doNotDisturb"
            src={isOn
                ? 'https://cdn.iphonelife.com/sites/iphonelife.com/files/do-not-disturb-iphone_0.jpg'
                : 'https://www.xyzapk.com/wp-content/uploads/2017/11/com.kapye_.greenlight.jpg.png'
            }
        />
    )
}
