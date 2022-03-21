import { TEST_VARIABLE } from '@appName/core';

const DebugPage = () => <div>{TEST_VARIABLE} and {process.env.NEXT_PUBLIC_DEBUG}</div>;

export default DebugPage;
