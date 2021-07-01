import { EUserUid } from "@config/data/typings"
import { User } from "@feed/data/database"

const { /*JAMES,*/ MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userFollowsTable: Map<EUserUid, Partial<User>> = new Map([
	[MICHAEL, {
    "uuid": MICHAEL,
    "name": "Michael",
		"leaders": [JENNY, TOM],
		"followers": [TOM, ETHAN]
	}],
	[JENNY,{
    "uuid": JENNY,
    "name": "Jenny",
		"leaders": [JACKY, MIA, ETHAN],
		"followers": [MICHAEL, JACKY]
	}],
	[TOM, {
    "uuid": TOM,
    "name": "Tom",
		"leaders": [MICHAEL],
		"followers": [MICHAEL, /*JAMES,*/ ]
	}],
	[JACKY, {
    "uuid": JACKY,
    "name": "Jacky",
		"leaders": [JENNY, /*JAMES,*/ MARK
		],
		"followers": [JENNY, /*JAMES,*/ ]
	}],
	[MIA, {
    "uuid": MIA,
    "name": "Mia",
		"leaders": [ MARK, /*JAMES,*/ ],
		"followers": [JENNY]
	}],
	[ETHAN, {
    "uuid": ETHAN,
    "name": "Ethan",
		"leaders": [MICHAEL, /*JAMES,*/ ],
		"followers": [JENNY]
	}],
	[MARK,{
    "uuid": MARK,
    "name": "Mark",
		"leaders": [JENNY, MIA, JACKY],
		"followers": [JACKY, MIA]
	}],
	// [JAMES,{
  //   "uuid": JAMES,
  //   "name": "James",
	// 	"leaders": [JACKY, TOM],
	// 	"followers": [MIA, ETHAN]
	// }]
])