import { Bytes } from "@graphprotocol/graph-ts";
import {
  Ended as EndedEvent,
  Joined as JoinedEvent,
  Started as StartedEvent,
  Transfer as TransferEvent,
} from "../generated/Battle/Battle";
import { Battle, Transfer, User } from "../generated/schema";

function loadOrCreateUser(id: Bytes): User {
  let user = User.load(id);
  if (!user) {
    user = new User(id);
    user.battles = 0;
    user.victories = 0;
    user.defeats = 0;
    user.draws = 0;
  }
  return user;
}

export function handleStarted(event: StartedEvent): void {
  // Save battle
  let battle = new Battle(event.params.tokenId.toString());
  battle.userOne = event.transaction.from;
  battle.userOneSquad = event.params.params.userOneSquad;
  battle.userOneSquadHash = event.params.params.userOneSquadHash;
  battle.userTwo = event.params.params.userTwo;
  battle.userTwoSquad = event.params.params.userTwoSquad;
  battle.result = event.params.params.result;
  battle.btcUsd = event.params.params.btcUsd;
  battle.ethUsd = event.params.params.ethUsd;
  battle.linkUsd = event.params.params.linkUsd;
  battle.started = event.params.params.started;
  battle.joined = event.params.params.joined;
  battle.ended = event.params.params.ended;
  battle.save();
  // Update user
  let user = loadOrCreateUser(battle.userOne);
  user.battles += 1;
  user.save();
}

export function handleJoined(event: JoinedEvent): void {
  // Update battle
  let battle = Battle.load(event.params.tokenId.toString());
  if (!battle) {
    return;
  }
  battle.userOne = event.transaction.from;
  battle.userOneSquad = event.params.params.userOneSquad;
  battle.userOneSquadHash = event.params.params.userOneSquadHash;
  battle.userTwo = event.params.params.userTwo;
  battle.userTwoSquad = event.params.params.userTwoSquad;
  battle.result = event.params.params.result;
  battle.btcUsd = event.params.params.btcUsd;
  battle.ethUsd = event.params.params.ethUsd;
  battle.linkUsd = event.params.params.linkUsd;
  battle.started = event.params.params.started;
  battle.joined = event.params.params.joined;
  battle.ended = event.params.params.ended;
  battle.save();
  // Update user
  let user = loadOrCreateUser(battle.userTwo);
  user.battles += 1;
  user.save();
}

export function handleEnded(event: EndedEvent): void {
  // Update battle
  let battle = Battle.load(event.params.tokenId.toString());
  if (!battle) {
    return;
  }
  battle.userOne = event.transaction.from;
  battle.userOneSquad = event.params.params.userOneSquad;
  battle.userOneSquadHash = event.params.params.userOneSquadHash;
  battle.userTwo = event.params.params.userTwo;
  battle.userTwoSquad = event.params.params.userTwoSquad;
  battle.result = event.params.params.result;
  battle.btcUsd = event.params.params.btcUsd;
  battle.ethUsd = event.params.params.ethUsd;
  battle.linkUsd = event.params.params.linkUsd;
  battle.started = event.params.params.started;
  battle.joined = event.params.params.joined;
  battle.ended = event.params.params.ended;
  battle.save();
  // Update users
  let userOne = loadOrCreateUser(battle.userOne);
  let userTwo = loadOrCreateUser(battle.userTwo);
  if (battle.result.toString() == "1") {
    userOne.victories += 1;
    userTwo.defeats += 1;
  } else if (battle.result.toString() == "2") {
    userOne.defeats += 1;
    userTwo.victories += 1;
  } else {
    userOne.draws += 1;
    userTwo.draws += 1;
  }
  userOne.save();
  userTwo.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
