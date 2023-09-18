const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      <OweMessage name={friend.name} balance={friend.balance} />
      <button className="button">Select</button>
    </li>
  );
}

function OweMessage({ balance, name }) {
  return (
    <>
      {balance < 0 ? (
        <p className="red">
          You owe {name} ${Math.abs(balance)}.
        </p>
      ) : balance > 0 ? (
        <p className="green">
          {name} owes you ${balance}.
        </p>
      ) : (
        <p>You and {name} are even.</p>
      )}
    </>
  );
}
