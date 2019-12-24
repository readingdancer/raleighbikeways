
const colors = {
    CITRIX: '#f9423a',
    PROGRAMMED: '#3498DB',
    GREENWAY: '#28B463',
    EXISTING: '#EEE',
}

export const layerStyles = {
    RALEIGH_ROAD_EXISTING: {
        'line-color': [
            'match',
            ['get', 'Type'],
            'Bike Lane', colors.EXISTING,
            'Bike Lane/Shared Lane Markings', colors.EXISTING,
            'Buffered Bike Lane', colors.EXISTING,
            'Buffered Bike Lane/Bike Lane', colors.EXISTING,
            'Buffered Bike Lane/Shared Lane Markings', colors.EXISTING,
            'Separated Bike Lane', colors.EXISTING,
            'Multi-Use Path', colors.EXISTING,
            // 'Neighborhood Bikeway', 'green',
            // 'Shared Lane Markings', 'aqua',
            // 'Unknown', 'red',
            'grey'
        ],
        'line-width': [
            'match',
            ['get', 'Type'],
            'Bike Lane', 1.5,
            'Bike Lane/Shared Lane Markings', 1.5,
            'Buffered Bike Lane', 2,
            'Buffered Bike Lane/Bike Lane', 2,
            'Buffered Bike Lane/Shared Lane Markings', 2,
            'Separated Bike Lane', 2,
            'Multi-Use Path', 1.5,
            // 'Neighborhood Bikeway', 1.5,
            // 'Shared Lane Markings', 1.5,
            // 'Unknown', 1.5,
            0
        ]
    },
    RALEIGH_ROAD_EXISTING_DASHED: {
        'line-color': [
            'match',
            ['get', 'Type'],
            // 'Bike Lane', 'blue',
            // 'Bike Lane/Shared Lane Markings', 'cyan',
            // 'Buffered Bike Lane', 'magenta',
            // 'Buffered Bike Lane/Bike Lane', 'yellow',
            // 'Buffered Bike Lane/Shared Lane Markings', colors.EXISTING,
            // 'Separated Bike Lane', 'blue',
            'Neighborhood Bikeway', colors.EXISTING,
            // 'Multi-Use Path', colors.EXISTING,
            'Shared Lane Markings', colors.EXISTING,
            'Unknown', colors.EXISTING,
            'grey'
        ],
        'line-width': [
            'match',
            ['get', 'Type'],
            // 'Bike Lane', 1.5,
            // 'Bike Lane/Shared Lane Markings', 1.5,
            // 'Buffered Bike Lane', 1.5,
            // 'Buffered Bike Lane/Bike Lane', 1.5,
            // 'Buffered Bike Lane/Shared Lane Markings', 1.5,
            // 'Separated Bike Lane', 1.5,
            'Neighborhood Bikeway', 1.5,
            // 'Multi-Use Path', 1.5,
            'Shared Lane Markings', 1.5,
            'Unknown', 1.5,
            0
        ],
        'line-dasharray': [1, 2]
    },
    RALEIGH_GREENWAYS: {
        'line-color': colors.GREENWAY,
        'line-width': 1.5,
        'line-opacity': [
            'case',
            //This will only show if the width is greater than 6 feet AND the path material is NOT gravel / natural
            ["all",
                ['>', ['get','WIDTH_FT'],6],
                ["match",["get","MATERIAL"],["Natural","Gravel"],false,true] 
            ],1,
            0,
        ]
    },
    RALEIGH_GREENWAYS_DASHED: {
        'line-color': colors.GREENWAY,
        'line-width': 1.5,
        'line-opacity': [
        'case',
            //This will only show if the width is less than or equal to 6 feet OR the path material is gravel / natural
            ["all",
                ['>', ['get','WIDTH_FT'],6],
                ["match",["get","MATERIAL"],["Natural","Gravel"],false,true] 
            ],0,
            1,
        ],
        'line-dasharray': [1, 2]
    },
    RALEIGH_ROAD_PROGRAMMED: {
        'line-color': [
            'match',
            ['get', 'Type'],
            'Bike Lane', colors.PROGRAMMED,
            'Bike Lane/Shared Lane Markings', colors.PROGRAMMED,
            'Buffered Bike Lane', colors.PROGRAMMED,
            'Buffered Bike Lane/Bike Lane', colors.PROGRAMMED,
            'Buffered Bike Lane/Shared Lane Markings', colors.PROGRAMMED,
            'Separated Bike Lane', colors.PROGRAMMED,
            'Multi-Use Path', colors.PROGRAMMED,
            // 'Neighborhood Bikeway', colors.PROGRAMMED,
            // 'Shared Lane Markings', colors.PROGRAMMED,
            // 'Unknown', colors.PROGRAMMED,
            'grey'
        ],
        'line-width': [
            'match',
            ['get', 'Type'],
            'Bike Lane', 1.5,
            'Bike Lane/Shared Lane Markings', 1.5,
            'Buffered Bike Lane', 2,
            'Buffered Bike Lane/Bike Lane', 2,
            'Buffered Bike Lane/Shared Lane Markings', 2,
            'Separated Bike Lane', 2,
            'Multi-Use Path', 1.5,
            // 'Neighborhood Bikeway', 1.5,
            // 'Shared Lane Markings', 1.5,
            // 'Unknown', 1.5,
            0
        ]
    },
    RALEIGH_ROAD_PROGRAMMED_DASHED: {
        'line-color': [
            'match',
            ['get', 'Type'],
            // 'Bike Lane', colors.EXISTING,
            // 'Bike Lane/Shared Lane Markings', colors.EXISTING,
            // 'Buffered Bike Lane', colors.EXISTING,
            // 'Buffered Bike Lane/Bike Lane', colors.EXISTING,
            // 'Buffered Bike Lane/Shared Lane Markings', colors.EXISTING,
            // 'Separated Bike Lane', colors.EXISTING,
            // 'Multi-Use Path', colors.EXISTING,
            'Neighborhood Bikeway', colors.PROGRAMMED,
            'Shared Lane Markings', colors.PROGRAMMED,
            'Unknown', colors.PROGRAMMED,
            'grey'
        ],
        'line-width': [
            'match',
            ['get', 'Type'],
            // 'Bike Lane', 1.5,
            // 'Bike Lane/Shared Lane Markings', 1.5,
            // 'Buffered Bike Lane', 1.5,
            // 'Buffered Bike Lane/Bike Lane', 1.5,
            // 'Buffered Bike Lane/Shared Lane Markings', 1.5,
            // 'Separated Bike Lane', 1.5,
            'Neighborhood Bikeway', 1.5,
            // 'Multi-Use Path', 1.5,
            'Shared Lane Markings', 1.5,
            'Unknown', 1.5,
            0
        ],
        'line-dasharray': [1, 2]
    },
    CARY_ROAD_EXISTING: {
        'line-color': colors.EXISTING,
        'line-width': [
            "match",
            ['get','FACILTYTYPE'],
            ['STRIPED'],1.5,
            ['PROTECTED BIKE LANES'],2,
            0
        ],
    },
    CARY_ROAD_EXISTING_DASHED: {
        'line-color': colors.EXISTING,
        'line-width': [
            "match",
            ['get','FACILTYTYPE'],
            ['STRIPED','PROTECTED BIKE LANES'],0,
            1.5
        ],
        'line-opacity': [
            "match",
            ['get','SPEEDLIMIT'],
            ["25","25 MPH"],1,
            0
        ],
        'line-dasharray': [1, 2]
    },
    CARY_GREENWAYS_EXISTING: {
        'line-color': colors.GREENWAY,
        'line-width': 1.5,
        'line-opacity': [
            'case',
            //This will only show if the width is greater than 6 feet AND the path material is NOT gravel / aggregate / limestone
            ["all",
                ['>', ['get','WIDTH'],6],
                ["match",["get","SURFTYPE"],["Aggregate","Limestone","Gravel"],false,true] 
            ],1,
            0,
        ]
    },
    CARY_GREENWAYS_EXISTING_DASHED: {
        'line-color': colors.GREENWAY,
        'line-width': 1.5,
        'line-opacity': [
            'case',
            ["all",
                ['>', ['get','WIDTH'],6],
                ["match",["get","SURFTYPE"],["Aggregate","Limestone","Gravel"],false,true] 
            ],0,
            1,
        ],
        'line-dasharray': [1, 2]
    },
    CITRIX_CYCLE: {
        'circle-color': colors.CITRIX,
        'circle-radius': 4,
    },
};

// Custom styling for the direction line
// Make it see through so user can see the bike infrastructure. 
// We need to override the entire styling for each object, 
// the only real chage is to change the opacity
export const directionStyle = [{
    'id': 'directions-route-line',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'butt',
        'line-join': 'round'
    },
    'paint': {
        'line-color': {
            'property': 'congestion',
            'type': 'categorical',
            'default': '#4882c5',
            'stops': [
                ['unknown', '#4882c5'],
                ['low', '#4882c5'],
                ['moderate', '#f09a46'],
                ['heavy', '#e34341'],
                ['severe', '#8b2342']
            ]
        },
        'line-width': 7,
        'line-opacity': .5 // only real change
    },
    'filter': [
        'all',
        ['in', '$type', 'LineString'],
        ['in', 'route', 'selected']
    ]
}, {
    'id': 'directions-route-line-casing',
    'type': 'line',
    'source': 'directions',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#2d5f99',
        'line-width': 12,
        'line-opacity': .5 // only real change
    },
    'filter': [
        'all',
        ['in', '$type', 'LineString'],
        ['in', 'route', 'selected']
    ]
}];