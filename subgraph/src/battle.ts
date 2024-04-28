import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Ended as EndedEvent,
  Joined as JoinedEvent,
  Started as StartedEvent,
  Transfer as TransferEvent,
} from "../generated/Battle/Battle";
import {
  Approval,
  ApprovalForAll,
  Ended,
  Joined,
  Started,
  Transfer,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEnded(event: EndedEvent): void {
  let entity = new Ended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.params_userOneSquad = event.params.params.userOneSquad;
  entity.params_userOneSquadHash = event.params.params.userOneSquadHash;
  entity.params_userTwo = event.params.params.userTwo;
  entity.params_userTwoSquad = event.params.params.userTwoSquad;
  entity.params_result = event.params.params.result;
  entity.params_btcUsd = event.params.params.btcUsd;
  entity.params_ethUsd = event.params.params.ethUsd;
  entity.params_linkUsd = event.params.params.linkUsd;
  entity.params_started = event.params.params.started;
  entity.params_joined = event.params.params.joined;
  entity.params_ended = event.params.params.ended;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleJoined(event: JoinedEvent): void {
  let entity = new Joined(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.params_userOneSquad = event.params.params.userOneSquad;
  entity.params_userOneSquadHash = event.params.params.userOneSquadHash;
  entity.params_userTwo = event.params.params.userTwo;
  entity.params_userTwoSquad = event.params.params.userTwoSquad;
  entity.params_result = event.params.params.result;
  entity.params_btcUsd = event.params.params.btcUsd;
  entity.params_ethUsd = event.params.params.ethUsd;
  entity.params_linkUsd = event.params.params.linkUsd;
  entity.params_started = event.params.params.started;
  entity.params_joined = event.params.params.joined;
  entity.params_ended = event.params.params.ended;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleStarted(event: StartedEvent): void {
  let entity = new Started(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.params_userOneSquad = event.params.params.userOneSquad;
  entity.params_userOneSquadHash = event.params.params.userOneSquadHash;
  entity.params_userTwo = event.params.params.userTwo;
  entity.params_userTwoSquad = event.params.params.userTwoSquad;
  entity.params_result = event.params.params.result;
  entity.params_btcUsd = event.params.params.btcUsd;
  entity.params_ethUsd = event.params.params.ethUsd;
  entity.params_linkUsd = event.params.params.linkUsd;
  entity.params_started = event.params.params.started;
  entity.params_joined = event.params.params.joined;
  entity.params_ended = event.params.params.ended;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
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
