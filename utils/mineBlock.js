const mineBlocks = async (n) => {
	for (let index = 0; index < n; index++) {
		await ethers.provider.send("evm_mine");
	}
};

module.exports = { mineBlocks };
