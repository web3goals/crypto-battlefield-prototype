use dep::std;

#[export]
fn hash(squad: [Field; 3]) -> Field {
    let squad_hash = std::hash::pedersen_hash(squad);
    squad_hash
}
