import { getAddressesForCounterFactualAccounts } from '../biconomy/getAddressesForCounterFactualAccounts';
import { getHolders } from '../airstack';

export async function ServerPlayground() {
  console.log(
    await getAddressesForCounterFactualAccounts({ holdersQueryResponse: [] })
  );

  await getHolders();

  return <></>;
}
