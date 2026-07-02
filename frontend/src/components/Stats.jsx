import {
FaTasks,
FaCheckCircle,
FaClock
} from "react-icons/fa";

function Stats({tasks}){

const total=tasks.length;

const completed=tasks.filter(
t=>t.completed
).length;

const pending=total-completed;

return(

<div className="stats">

<div className="stat-card">

<div className="stat-icon icon-blue">

<FaTasks/>

</div>

<h2>{total}</h2>

<p>Total Tasks</p>

</div>

<div className="stat-card">

<div className="stat-icon icon-green">

<FaCheckCircle/>

</div>

<h2>{completed}</h2>

<p>Completed</p>

</div>

<div className="stat-card">

<div className="stat-icon icon-orange">

<FaClock/>

</div>

<h2>{pending}</h2>

<p>Pending</p>

</div>

</div>

)

}

export default Stats;