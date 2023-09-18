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
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
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
      <Button>Select</Button>
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

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👯‍♀️ Name</label>
      <input type="text"></input>
      <label>🏞️ Image URL</label>
      <input type="url"></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <label>💵 Bill Value</label>
      <input type="text"></input>
      <label>🤑 Your Expense</label>
      <input type="text"></input>
      <label>👯‍♂️ X's Expense</label>
      <input type="text"></input>
      <label>🙀 Who Pays the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
