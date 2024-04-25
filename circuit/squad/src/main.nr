use dep::std;

//
// Circuit that validates squad
//
fn main(squad_hash: pub Field, squad: [Field; 3]) {
    let squad_size = squad[0] + squad[1] + squad[2];
    assert(squad_size == 10 as Field, "Squad size should be equal to 10");
    let squad_computed_hash = std::hash::pedersen_hash(squad);
    assert(squad_hash == squad_computed_hash, "Squad hash integrity check failed");
}

#[test]
fn test_valid_squad() {
    let squad = [3, 1, 6];
    let squad_hash = std::hash::pedersen_hash(squad);
    main(squad_hash, squad);
}

#[test(should_fail_with = "Squad hash integrity check failed!")]
fn test_invalid_squad_hash() {
    let squad = [3, 1, 6];
    let fake_squad = [3, 2, 5];
    let fake_squad_hash = std::hash::pedersen_hash(fake_squad);
    main(fake_squad_hash, squad);
}
