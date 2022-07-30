import "./widgetLg.css"
import { useState, useEffect } from "react"
import axios from 'axios';

const WidgetLg = () => {
    const [order, setOrders] = useState([]);

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/orders?new=true");
                setOrders(res.data)
            } catch (e) {
                console.log(e.message)
            }
        };
        makeRequest();
    }, []);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                {order.map((order) => {
                    return <tr key={order._id} className="widgetLgTr">
                        <td className="widgetLgUser">
                            <span className="widgetLgName">{order._id}</span>
                        </td>
                        <td className="widgetLgDate">
                            {order.createdAt}
                        </td>
                        <td className="widgetLgAmount">
                            Rp {order.amount}
                        </td>
                        <td className="widgetLgStatus">
                            <Button type={order.status} />
                        </td>
                    </tr>
                })}
            </table>
        </div>
    )
}

export default WidgetLg