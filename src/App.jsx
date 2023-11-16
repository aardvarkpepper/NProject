import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import axios from 'axios'

const API = import.meta.env.VITE_REACT_APP_API_URL;

/*

2023 Nov 15

INSERT INTO unit
(environment_id, combatphase_id_attack, combatphase_id_defense, attack_targets_environment_id, defense_targets_environment_id, name, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
VALUES
(1, 6, 6, 4, 4, 'Infantry', 3, 1, 1, 2, 1, 1),  
(1, 6, 6, 4, 4, 'Artillery', 4, 1, 2, 2, 1, 1),
(1, 6, 6, 4, 4, 'Tank', 6, 2, 3, 3, 1, 1),
(1, 0, 2, 0, 3, 'Antiaircraft Gun', 5, 1, 0, 1, 0, 3),
(1, 0, 2, 0, 3, 'Industrial Complex', 15, 0, 0, 1, 0, 3),
(2, 0, 0, 0, 0, 'Transport', 7, 2, 0, 0, 0, 0),
(2, 4, 4, 2, 2, 'Submarine', 6, 2, 2, 1, 1, 1),
(2, 6, 6, 4, 4, 'Destroyer', 8, 2, 2, 2, 1, 1),
(2, 6, 6, 4, 4, 'Aircraft Carrier', 14, 2, 1, 2, 1, 1),
(2, 6, 6, 4, 4, 'Cruiser', 12, 3, 3, 1, 1),
(2, 6, 6, 4, 4, 'Battleship', 20, 2, 4, 4, 1, 1),
(3, 6, 6, 4, 4, 'Fighter', 10, 4, 3, 4, 1, 1),
(3, 6, 6, 4, 4, 'Bomber', 12, 6, 4, 1, 1, 1),
(1, 6, 6, 4, 4, 'Infantry, Buffed', 3, 1, 2, 2),
(2, 6, 6, 2, 2, 'Submarine, Debuffed', 6, 2, 2, 1, 1, 1),
(2, 6, 6, 0, 0, 'Battleship, Damage Counter', 0, 2, 0, 0, 0, 0),
(1, 2, 0, 4, 0, 'Cruiser, Naval Gunfire Support', 0, 0, 3, 0, 1, 0),
(1, 2, 0, 4, 0, 'Battleship, Naval Gunfire Support', 0, 0, 4, 0, 1, 0);

INSERT INTO ability
(faction_id_affected, remove_unit_id, add_unit_id, phase_id, name, number_required, target_affected_count)
VALUES
(1, 1, 14, 5, 'Boost Infantry', 1, 1),
(3, 7, 15, 3, 'Debuff Submarine', 1, -1),
(1, 0, 16, 1, 'Battleship Damage Counter', 1, 1),
(1, 0, 17, 1, 'Cruiser NGFS', 1, 1 ),
(1, 0, 18, 1, 'Battlehship NGFS', 1, 1);

INSERT INTO unit_x_ability
(unit_id, ability_id)
VALUES
(2, 1),
(8, 2),
(11, 3),
(10, 4),
(11, 5);

INSERT INTO combatphase
(name, description)
VALUES
('One-Time Enhancement', '(E.g. battleship create temporary unit)'),
('One-Time Combat', '(E.g. AA gun, IC AA)'),
('First Strike Enhancement', '(E.g. destroyer debuff enemy sub)'),
('First Strike Combat', '(E.g. submarine surprise strike)'),
('Regular Enhancement', '(E.g. artillery buff infantry)'),
('Regular Combat', '(E.g. infantry and fighters vs infantry)'),
('Resolve Subphase', '(E.g. all units on one side destroyed OR sides can no longer hit one another, attacker retreat, attacker partial retreat (amphib), repeat from First Strike Enhancement)'),
('Cleanup', 'E.g. remove battleship temporary unit, remove boosted infantry, otherwise revert temporary changes'); 

Create form to take unit count inputs.
Create form to input raw OOLs.  Try drag and drop?  Is that really best?  What is used to show
an item is "draggable"?  And buttons to move left/right.
Start phase handling.  At appropriate phases, unit_x_ability triggers to create temporary units.
"Hit array" generates for attacker where array[i] = probability of i hits.
So array[0] = probability 0 hits, array[1] = probability 1 hit, etc.

Attacker hits are allocated to defender per OOL AI (or here, form data).

Defender hit array generated.  Defender hits allocated to attacker per OOL AI.

Round 1 through X are calculated correctly, including possibility of no hits by anyone.

However, at some point probabilities have to be folded in so battles will end.
Suppose round X concludes, and the attacker did not wish to retreat.  Then we change the calculations
to eliminate the possibility of no hits being scored by either side, as the battle would just repeat.

Attacker retreat decisions are made only in rounds in which attacker and/or defender scored a hit.

This calculator should return not just raw win percentages, but percentages based on attacker
retreat conditions. The amount of pre-caching to do this with OOL, though, could be prohibitive.

At final phase, temporary units are cleaned up.

Create form to input multiple OOL AI settings per user.
Create "openings" form for autofilled opening moves.
*/

function App() {

//set auth variable
  // const {currentUser} = useAuth()

  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState({})


  const [userName, setUserName] = useState(null)
  const [language, setLanguage] = useState(1); 

//   useEffect(()=>{
//   if(currentUser){
//     axios.get(`${API}/clients/${currentUser.uid}`)
//     .then((results)=>{
//       setUserDetails(results.data.username)
//       console.log(userDetails);
//     })
//     console.log(`user UID: ${currentUser.uid}`);

//   }else console.log(null);
// },[currentUser])

  return (
    <div className="App">
      <NavBar 
      user={user} 
      setUser={setUser} 
      // auth={auth}
      userName={userName}
      setUserName={setUserName}
      language={language}
      setLanguage={setLanguage}
      userDetails={userDetails}
      />
      <Routes>
        <Route path='/' element={<Landing language={language}/>} />
        <Route path='/dashboard' element={<Dashboard userName={userName} language={language}/>} />
        <Route path='/lesson/:lessonId' element={<Lesson language={language}/>} />
        {/* Below test route for working on profile page before backend username params*/}
        <Route path='/profile' element={<Profile userDetails={userDetails}/>} />
        <Route path='/sandbox' element={<Sandbox/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/signup' element={<SignUpPage/>} />
      </Routes>
    </div>
  )
}

export default App
