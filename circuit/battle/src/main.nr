use dep::std;

//
// Circuit that validates battle
//
fn main(user_one_squad_hash: pub Field, user_one_squad: [Field; 3], user_two_squad: pub [Field; 3], battle_result: pub Field) {
    // Check user one squad hash
    let user_one_squad_computed_hash = std::hash::pedersen_hash(user_one_squad);
    assert(user_one_squad_computed_hash == user_one_squad_hash, "User one's squad hash integrity check failed");

    // Calculate health 
    let mut user_one_health = (user_one_squad[0] as u8) * 6 + (user_one_squad[1] as u8) * 4 + (user_one_squad[2] as u8) * 2;
    let mut user_two_health = (user_two_squad[0] as u8) * 6 + (user_two_squad[1] as u8) * 4 + (user_two_squad[2] as u8) * 2;

    // Calculate attack
    let user_one_attack = (user_one_squad[0] as u8) * 1 + (user_one_squad[1] as u8) * 2 + (user_one_squad[2] as u8) * 3;
    let user_two_attack = (user_two_squad[0] as u8) * 1 + (user_two_squad[1] as u8) * 2 + (user_two_squad[2] as u8) * 3;

    // Calculate health after attack
    user_one_health = user_one_health - user_two_attack;
    user_two_health = user_two_health - user_one_attack;

    // Calculate battle result (0 draw, 1 - user one won, 2 - user two won)
    let mut computed_battle_result = 0;
    if (user_one_health > user_two_health) {
        computed_battle_result = 1;
    } 
    if (user_one_health < user_two_health) {
        computed_battle_result = 2;
    }
    assert(computed_battle_result == battle_result, "Battle result incorrect");
}

#[test]
fn test_draw() {
    let user_one_squad = [4, 1, 5];
    let user_one_squad_hash = std::hash::pedersen_hash(user_one_squad);
    let user_two_squad = [4, 1, 5];
    let battle_result = 0;
    main(user_one_squad_hash, user_one_squad, user_two_squad, battle_result);
}

#[test]
fn test_user_one_win() {
    let user_one_squad = [4, 1, 5];
    let user_one_squad_hash = std::hash::pedersen_hash(user_one_squad);
    let user_two_squad = [3, 2, 5];
    let battle_result = 1;
    main(user_one_squad_hash, user_one_squad, user_two_squad, battle_result);
}

#[test]
fn test_user_two_win() {
    let user_one_squad = [4, 1, 5];
    let user_one_squad_hash = std::hash::pedersen_hash(user_one_squad);
    let user_two_squad = [5, 2, 3];
    let battle_result = 2;
    main(user_one_squad_hash, user_one_squad, user_two_squad, battle_result);
}
