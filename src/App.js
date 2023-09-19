import { useState } from "react";

const imageUrlRandom = "https://i.pravatar.cc/48";
const initialFriends = [
  {
    id: 118836,
    name: "Mikias",
    image: "https://i.pravatar.cc/48?u=1188844",
    balance: -75,
  },
  {
    id: 933372,
    name: "Abse",
    image: "https://i.pravatar.cc/48?u=11676767",
    balance: 20,
  },
  {
    id: 499476,
    name: "Fasil",
    image: "https://i.pravatar.cc/48?u=056565656",
    balance: 0,
  },
];

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddClick() {
    setIsAddOpen((isAddOpen) => !isAddOpen);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setIsAddOpen(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((curFriend) =>
      curFriend?.id === friend.id ? null : friend
    );
    setIsAddOpen(false);
  }

  function handleUpdateFriend(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onFriendSelected={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {isAddOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddClick}>
          {isAddOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onBillUpdate={handleUpdateFriend}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onFriendSelected, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onFriendSelected={onFriendSelected}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onFriendSelected, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      <OweMessage name={friend.name} balance={friend.balance} />
      <Button onClick={() => onFriendSelected(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(imageUrlRandom);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { name, id, image: `${image}?=${id}`, balance: 0 };
    onAddFriend(newFriend);

    setImage(imageUrlRandom);
    setName("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯‍♀️ Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🏞️ Image URL</label>
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onBillUpdate }) {
  const [billValue, setBillValue] = useState("");
  const [userBill, setUserBill] = useState("");
  const [payer, setPayer] = useState("user");

  const friendBill = billValue ? billValue - userBill : "";

  function handleSubmit(e) {
    e.preventDefault();

    if (!billValue || !userBill) return;

    const newBalance = payer === "user" ? friendBill : -friendBill;
    onBillUpdate(newBalance);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Splitting up a bill with {selectedFriend?.name}</h2>
      <label>💵 Bill Value</label>
      <input
        type="number"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      ></input>

      <label>🤑 Your Expense</label>
      <input
        type="number"
        value={userBill}
        onChange={(e) =>
          setUserBill(
            Number(e.target.value) < billValue
              ? Number(e.target.value)
              : billValue
          )
        }
      ></input>

      <label>👯‍♂️ {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={friendBill}></input>

      <label>🙀 Who Pays the bill</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
