import './loader.css'
export function ActivityIndicator({w = 30,h = 30,  color = "#000",borderColor = "#ccc" }) {
    return (
        // <div className="loader"></div>
        <div
            className="spinner"
            style={{
                width: w,
                height: h,
                borderColor: borderColor,
                borderTopColor: color,
            }}
        ></div>
    )
}