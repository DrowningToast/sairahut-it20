import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires','create_at','update_at']);

export const UserScalarFieldEnumSchema = z.enum(['create_at','update_at','id','name','email','emailVerified','image','type','balance','factionId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const QRInstancesScalarFieldEnumSchema = z.enum(['id','create_at','update_at','ownerId','quota','secret']);

export const PasscodeInstancesScalarFieldEnumSchema = z.enum(['id','create_at','update_at','usedById','ownerId','content']);

export const FactionsScalarFieldEnumSchema = z.enum(['id','name','handler','create_at','update_at']);

export const RevealedHintInstancesScalarFieldEnumSchema = z.enum(['create_at','update_at','hintsHintSlugId','hintsSophomoreId','pairId']);

export const PairScalarFieldEnumSchema = z.enum(['id','freshmenDetailsId','sophomoreDetailsId']);

export const FreshmenDetailsScalarFieldEnumSchema = z.enum(['create_at','update_at','id','userId','thisOrThat','thisOrThatReady','student_id','title','first_name','last_name','nickname','branch','facebook_link','instagram_link','phone','passcodePoints','easterEgg','vip']);

export const HintSlugsScalarFieldEnumSchema = z.enum(['slug','displayName','index']);

export const HintsScalarFieldEnumSchema = z.enum(['hintSlugId','content','sophomoreId','craete_at','update_at']);

export const MagicVerseIdentificationInstanceScalarFieldEnumSchema = z.enum(['create_at','update_at','id','content','sophomoreDetailsId','isExpired']);

export const StarterMagicVerseScalarFieldEnumSchema = z.enum(['id','create_at','update_at','freshmenDetailsId','sophomoreDetailsId']);

export const MagicVerseCastScalarFieldEnumSchema = z.enum(['create_at','update_at','id','casterId','targetId','result']);

export const MagicVersesScalarFieldEnumSchema = z.enum(['handler','name','wildcard','cost']);

export const SophomoreDetailsScalarFieldEnumSchema = z.enum(['create_at','update_at','thisOrThat','thisOrThatReady','hintsReady','userId','id','fullname','title','student_id','nickname','branch','participate','many_fresh','facebook_link','instagram_link','phone']);

export const TodayResinScalarFieldEnumSchema = z.enum(['id','create_at','quota','freshmenDetailsId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const PlayerTypeSchema = z.enum(['NONE','GUEST','FRESHMEN','SOPHOMORE','SENIOR']);

export type PlayerTypeType = `${z.infer<typeof PlayerTypeSchema>}`

export const NameTitleSchema = z.enum(['MR','MRS']);

export type NameTitleType = `${z.infer<typeof NameTitleSchema>}`

export const BranchSchema = z.enum(['IT','DSBA','BIT','AIT']);

export type BranchType = `${z.infer<typeof BranchSchema>}`

export const ThisOrThatSchema = z.enum(['LEFT','RIGHT']);

export type ThisOrThatType = `${z.infer<typeof ThisOrThatSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  type: PlayerTypeSchema,
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  balance: z.number().int(),
  factionId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// QR INSTANCES SCHEMA
/////////////////////////////////////////

export const QRInstancesSchema = z.object({
  id: z.string().cuid(),
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  ownerId: z.string(),
  quota: z.number().int(),
  secret: z.string(),
})

export type QRInstances = z.infer<typeof QRInstancesSchema>

/////////////////////////////////////////
// PASSCODE INSTANCES SCHEMA
/////////////////////////////////////////

export const PasscodeInstancesSchema = z.object({
  id: z.string().uuid(),
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  usedById: z.string().nullable(),
  ownerId: z.string(),
  content: z.string(),
})

export type PasscodeInstances = z.infer<typeof PasscodeInstancesSchema>

/////////////////////////////////////////
// FACTIONS SCHEMA
/////////////////////////////////////////

export const FactionsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  handler: z.string(),
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
})

export type Factions = z.infer<typeof FactionsSchema>

/////////////////////////////////////////
// REVEALED HINT INSTANCES SCHEMA
/////////////////////////////////////////

export const RevealedHintInstancesSchema = z.object({
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  hintsHintSlugId: z.string(),
  hintsSophomoreId: z.string(),
  pairId: z.string(),
})

export type RevealedHintInstances = z.infer<typeof RevealedHintInstancesSchema>

/////////////////////////////////////////
// PAIR SCHEMA
/////////////////////////////////////////

export const PairSchema = z.object({
  id: z.string().cuid(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string(),
})

export type Pair = z.infer<typeof PairSchema>

/////////////////////////////////////////
// FRESHMEN DETAILS SCHEMA
/////////////////////////////////////////

export const FreshmenDetailsSchema = z.object({
  thisOrThat: ThisOrThatSchema.array(),
  title: NameTitleSchema,
  branch: BranchSchema,
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  id: z.string().cuid(),
  userId: z.string(),
  thisOrThatReady: z.boolean(),
  student_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  facebook_link: z.string().nullable(),
  instagram_link: z.string().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int(),
  easterEgg: z.boolean(),
  vip: z.boolean(),
})

export type FreshmenDetails = z.infer<typeof FreshmenDetailsSchema>

/////////////////////////////////////////
// HINT SLUGS SCHEMA
/////////////////////////////////////////

export const HintSlugsSchema = z.object({
  slug: z.string(),
  displayName: z.string(),
  index: z.number().int().nullable(),
})

export type HintSlugs = z.infer<typeof HintSlugsSchema>

/////////////////////////////////////////
// HINTS SCHEMA
/////////////////////////////////////////

export const HintsSchema = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string(),
  craete_at: z.coerce.date(),
  update_at: z.coerce.date(),
})

export type Hints = z.infer<typeof HintsSchema>

/////////////////////////////////////////
// MAGIC VERSE IDENTIFICATION INSTANCE SCHEMA
/////////////////////////////////////////

export const MagicVerseIdentificationInstanceSchema = z.object({
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  id: z.string().cuid(),
  content: z.string(),
  sophomoreDetailsId: z.string(),
  isExpired: z.boolean(),
})

export type MagicVerseIdentificationInstance = z.infer<typeof MagicVerseIdentificationInstanceSchema>

/////////////////////////////////////////
// STARTER MAGIC VERSE SCHEMA
/////////////////////////////////////////

export const StarterMagicVerseSchema = z.object({
  id: z.string().cuid(),
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string(),
})

export type StarterMagicVerse = z.infer<typeof StarterMagicVerseSchema>

/////////////////////////////////////////
// MAGIC VERSE CAST SCHEMA
/////////////////////////////////////////

export const MagicVerseCastSchema = z.object({
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  id: z.string().cuid(),
  casterId: z.string(),
  targetId: z.string(),
  result: z.boolean().array(),
})

export type MagicVerseCast = z.infer<typeof MagicVerseCastSchema>

/////////////////////////////////////////
// MAGIC VERSES SCHEMA
/////////////////////////////////////////

export const MagicVersesSchema = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean(),
  cost: z.number(),
})

export type MagicVerses = z.infer<typeof MagicVersesSchema>

/////////////////////////////////////////
// SOPHOMORE DETAILS SCHEMA
/////////////////////////////////////////

export const SophomoreDetailsSchema = z.object({
  thisOrThat: ThisOrThatSchema.array(),
  title: NameTitleSchema,
  branch: BranchSchema,
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  thisOrThatReady: z.boolean(),
  hintsReady: z.boolean(),
  userId: z.string(),
  id: z.string().cuid(),
  fullname: z.string(),
  student_id: z.string(),
  nickname: z.string(),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().nullable(),
  instagram_link: z.string().nullable(),
  phone: z.string(),
})

export type SophomoreDetails = z.infer<typeof SophomoreDetailsSchema>

/////////////////////////////////////////
// TODAY RESIN SCHEMA
/////////////////////////////////////////

export const TodayResinSchema = z.object({
  id: z.string().cuid(),
  create_at: z.coerce.date(),
  quota: z.number().int(),
  freshmenDetailsId: z.string(),
})

export type TodayResin = z.infer<typeof TodayResinSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  freshmenDetails: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  sophomoreDetails: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  faction: z.union([z.boolean(),z.lazy(() => FactionsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  type: z.boolean().optional(),
  balance: z.boolean().optional(),
  factionId: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  freshmenDetails: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  sophomoreDetails: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  faction: z.union([z.boolean(),z.lazy(() => FactionsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// QR INSTANCES
//------------------------------------------------------

export const QRInstancesIncludeSchema: z.ZodType<Prisma.QRInstancesInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  scannedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QRInstancesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const QRInstancesArgsSchema: z.ZodType<Prisma.QRInstancesArgs> = z.object({
  select: z.lazy(() => QRInstancesSelectSchema).optional(),
  include: z.lazy(() => QRInstancesIncludeSchema).optional(),
}).strict();

export const QRInstancesCountOutputTypeArgsSchema: z.ZodType<Prisma.QRInstancesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => QRInstancesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const QRInstancesCountOutputTypeSelectSchema: z.ZodType<Prisma.QRInstancesCountOutputTypeSelect> = z.object({
  scannedBy: z.boolean().optional(),
}).strict();

export const QRInstancesSelectSchema: z.ZodType<Prisma.QRInstancesSelect> = z.object({
  id: z.boolean().optional(),
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  quota: z.boolean().optional(),
  secret: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  scannedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QRInstancesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PASSCODE INSTANCES
//------------------------------------------------------

export const PasscodeInstancesIncludeSchema: z.ZodType<Prisma.PasscodeInstancesInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  usedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
}).strict()

export const PasscodeInstancesArgsSchema: z.ZodType<Prisma.PasscodeInstancesArgs> = z.object({
  select: z.lazy(() => PasscodeInstancesSelectSchema).optional(),
  include: z.lazy(() => PasscodeInstancesIncludeSchema).optional(),
}).strict();

export const PasscodeInstancesSelectSchema: z.ZodType<Prisma.PasscodeInstancesSelect> = z.object({
  id: z.boolean().optional(),
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  usedById: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  content: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  usedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
}).strict()

// FACTIONS
//------------------------------------------------------

export const FactionsIncludeSchema: z.ZodType<Prisma.FactionsInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FactionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FactionsArgsSchema: z.ZodType<Prisma.FactionsArgs> = z.object({
  select: z.lazy(() => FactionsSelectSchema).optional(),
  include: z.lazy(() => FactionsIncludeSchema).optional(),
}).strict();

export const FactionsCountOutputTypeArgsSchema: z.ZodType<Prisma.FactionsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => FactionsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FactionsCountOutputTypeSelectSchema: z.ZodType<Prisma.FactionsCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const FactionsSelectSchema: z.ZodType<Prisma.FactionsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  handler: z.boolean().optional(),
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FactionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REVEALED HINT INSTANCES
//------------------------------------------------------

export const RevealedHintInstancesIncludeSchema: z.ZodType<Prisma.RevealedHintInstancesInclude> = z.object({
  hint: z.union([z.boolean(),z.lazy(() => HintsArgsSchema)]).optional(),
  pair: z.union([z.boolean(),z.lazy(() => PairArgsSchema)]).optional(),
}).strict()

export const RevealedHintInstancesArgsSchema: z.ZodType<Prisma.RevealedHintInstancesArgs> = z.object({
  select: z.lazy(() => RevealedHintInstancesSelectSchema).optional(),
  include: z.lazy(() => RevealedHintInstancesIncludeSchema).optional(),
}).strict();

export const RevealedHintInstancesSelectSchema: z.ZodType<Prisma.RevealedHintInstancesSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  hintsHintSlugId: z.boolean().optional(),
  hintsSophomoreId: z.boolean().optional(),
  pairId: z.boolean().optional(),
  hint: z.union([z.boolean(),z.lazy(() => HintsArgsSchema)]).optional(),
  pair: z.union([z.boolean(),z.lazy(() => PairArgsSchema)]).optional(),
}).strict()

// PAIR
//------------------------------------------------------

export const PairIncludeSchema: z.ZodType<Prisma.PairInclude> = z.object({
  freshmen: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  revealedHints: z.union([z.boolean(),z.lazy(() => RevealedHintInstancesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PairCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PairArgsSchema: z.ZodType<Prisma.PairArgs> = z.object({
  select: z.lazy(() => PairSelectSchema).optional(),
  include: z.lazy(() => PairIncludeSchema).optional(),
}).strict();

export const PairCountOutputTypeArgsSchema: z.ZodType<Prisma.PairCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PairCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PairCountOutputTypeSelectSchema: z.ZodType<Prisma.PairCountOutputTypeSelect> = z.object({
  revealedHints: z.boolean().optional(),
}).strict();

export const PairSelectSchema: z.ZodType<Prisma.PairSelect> = z.object({
  id: z.boolean().optional(),
  freshmenDetailsId: z.boolean().optional(),
  sophomoreDetailsId: z.boolean().optional(),
  freshmen: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  revealedHints: z.union([z.boolean(),z.lazy(() => RevealedHintInstancesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PairCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FRESHMEN DETAILS
//------------------------------------------------------

export const FreshmenDetailsIncludeSchema: z.ZodType<Prisma.FreshmenDetailsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  usedPasscodes: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  scannedQrs: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
  pair: z.union([z.boolean(),z.lazy(() => PairArgsSchema)]).optional(),
  todayResin: z.union([z.boolean(),z.lazy(() => TodayResinFindManyArgsSchema)]).optional(),
  StarterMagicVerse: z.union([z.boolean(),z.lazy(() => StarterMagicVerseFindManyArgsSchema)]).optional(),
  MagicVerseCast: z.union([z.boolean(),z.lazy(() => MagicVerseCastFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FreshmenDetailsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FreshmenDetailsArgsSchema: z.ZodType<Prisma.FreshmenDetailsArgs> = z.object({
  select: z.lazy(() => FreshmenDetailsSelectSchema).optional(),
  include: z.lazy(() => FreshmenDetailsIncludeSchema).optional(),
}).strict();

export const FreshmenDetailsCountOutputTypeArgsSchema: z.ZodType<Prisma.FreshmenDetailsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => FreshmenDetailsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FreshmenDetailsCountOutputTypeSelectSchema: z.ZodType<Prisma.FreshmenDetailsCountOutputTypeSelect> = z.object({
  usedPasscodes: z.boolean().optional(),
  scannedQrs: z.boolean().optional(),
  todayResin: z.boolean().optional(),
  StarterMagicVerse: z.boolean().optional(),
  MagicVerseCast: z.boolean().optional(),
}).strict();

export const FreshmenDetailsSelectSchema: z.ZodType<Prisma.FreshmenDetailsSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  thisOrThat: z.boolean().optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.boolean().optional(),
  title: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  nickname: z.boolean().optional(),
  branch: z.boolean().optional(),
  facebook_link: z.boolean().optional(),
  instagram_link: z.boolean().optional(),
  phone: z.boolean().optional(),
  passcodePoints: z.boolean().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  usedPasscodes: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  scannedQrs: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
  pair: z.union([z.boolean(),z.lazy(() => PairArgsSchema)]).optional(),
  todayResin: z.union([z.boolean(),z.lazy(() => TodayResinFindManyArgsSchema)]).optional(),
  StarterMagicVerse: z.union([z.boolean(),z.lazy(() => StarterMagicVerseFindManyArgsSchema)]).optional(),
  MagicVerseCast: z.union([z.boolean(),z.lazy(() => MagicVerseCastFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FreshmenDetailsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HINT SLUGS
//------------------------------------------------------

export const HintSlugsIncludeSchema: z.ZodType<Prisma.HintSlugsInclude> = z.object({
  Hints: z.union([z.boolean(),z.lazy(() => HintsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HintSlugsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HintSlugsArgsSchema: z.ZodType<Prisma.HintSlugsArgs> = z.object({
  select: z.lazy(() => HintSlugsSelectSchema).optional(),
  include: z.lazy(() => HintSlugsIncludeSchema).optional(),
}).strict();

export const HintSlugsCountOutputTypeArgsSchema: z.ZodType<Prisma.HintSlugsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => HintSlugsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HintSlugsCountOutputTypeSelectSchema: z.ZodType<Prisma.HintSlugsCountOutputTypeSelect> = z.object({
  Hints: z.boolean().optional(),
}).strict();

export const HintSlugsSelectSchema: z.ZodType<Prisma.HintSlugsSelect> = z.object({
  slug: z.boolean().optional(),
  displayName: z.boolean().optional(),
  index: z.boolean().optional(),
  Hints: z.union([z.boolean(),z.lazy(() => HintsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HintSlugsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HINTS
//------------------------------------------------------

export const HintsIncludeSchema: z.ZodType<Prisma.HintsInclude> = z.object({
  slug: z.union([z.boolean(),z.lazy(() => HintSlugsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  revealedHintInstances: z.union([z.boolean(),z.lazy(() => RevealedHintInstancesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HintsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HintsArgsSchema: z.ZodType<Prisma.HintsArgs> = z.object({
  select: z.lazy(() => HintsSelectSchema).optional(),
  include: z.lazy(() => HintsIncludeSchema).optional(),
}).strict();

export const HintsCountOutputTypeArgsSchema: z.ZodType<Prisma.HintsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => HintsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HintsCountOutputTypeSelectSchema: z.ZodType<Prisma.HintsCountOutputTypeSelect> = z.object({
  revealedHintInstances: z.boolean().optional(),
}).strict();

export const HintsSelectSchema: z.ZodType<Prisma.HintsSelect> = z.object({
  hintSlugId: z.boolean().optional(),
  content: z.boolean().optional(),
  sophomoreId: z.boolean().optional(),
  craete_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  slug: z.union([z.boolean(),z.lazy(() => HintSlugsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  revealedHintInstances: z.union([z.boolean(),z.lazy(() => RevealedHintInstancesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HintsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MAGIC VERSE IDENTIFICATION INSTANCE
//------------------------------------------------------

export const MagicVerseIdentificationInstanceIncludeSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceInclude> = z.object({
  sophomoreDetails: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
}).strict()

export const MagicVerseIdentificationInstanceArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceArgs> = z.object({
  select: z.lazy(() => MagicVerseIdentificationInstanceSelectSchema).optional(),
  include: z.lazy(() => MagicVerseIdentificationInstanceIncludeSchema).optional(),
}).strict();

export const MagicVerseIdentificationInstanceSelectSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  sophomoreDetailsId: z.boolean().optional(),
  isExpired: z.boolean().optional(),
  sophomoreDetails: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
}).strict()

// STARTER MAGIC VERSE
//------------------------------------------------------

export const StarterMagicVerseIncludeSchema: z.ZodType<Prisma.StarterMagicVerseInclude> = z.object({
  verses: z.union([z.boolean(),z.lazy(() => MagicVersesFindManyArgsSchema)]).optional(),
  fresh: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StarterMagicVerseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StarterMagicVerseArgsSchema: z.ZodType<Prisma.StarterMagicVerseArgs> = z.object({
  select: z.lazy(() => StarterMagicVerseSelectSchema).optional(),
  include: z.lazy(() => StarterMagicVerseIncludeSchema).optional(),
}).strict();

export const StarterMagicVerseCountOutputTypeArgsSchema: z.ZodType<Prisma.StarterMagicVerseCountOutputTypeArgs> = z.object({
  select: z.lazy(() => StarterMagicVerseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StarterMagicVerseCountOutputTypeSelectSchema: z.ZodType<Prisma.StarterMagicVerseCountOutputTypeSelect> = z.object({
  verses: z.boolean().optional(),
}).strict();

export const StarterMagicVerseSelectSchema: z.ZodType<Prisma.StarterMagicVerseSelect> = z.object({
  id: z.boolean().optional(),
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  freshmenDetailsId: z.boolean().optional(),
  sophomoreDetailsId: z.boolean().optional(),
  verses: z.union([z.boolean(),z.lazy(() => MagicVersesFindManyArgsSchema)]).optional(),
  fresh: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StarterMagicVerseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MAGIC VERSE CAST
//------------------------------------------------------

export const MagicVerseCastIncludeSchema: z.ZodType<Prisma.MagicVerseCastInclude> = z.object({
  caster: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  target: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  verses: z.union([z.boolean(),z.lazy(() => MagicVersesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MagicVerseCastCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MagicVerseCastArgsSchema: z.ZodType<Prisma.MagicVerseCastArgs> = z.object({
  select: z.lazy(() => MagicVerseCastSelectSchema).optional(),
  include: z.lazy(() => MagicVerseCastIncludeSchema).optional(),
}).strict();

export const MagicVerseCastCountOutputTypeArgsSchema: z.ZodType<Prisma.MagicVerseCastCountOutputTypeArgs> = z.object({
  select: z.lazy(() => MagicVerseCastCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MagicVerseCastCountOutputTypeSelectSchema: z.ZodType<Prisma.MagicVerseCastCountOutputTypeSelect> = z.object({
  verses: z.boolean().optional(),
}).strict();

export const MagicVerseCastSelectSchema: z.ZodType<Prisma.MagicVerseCastSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  id: z.boolean().optional(),
  casterId: z.boolean().optional(),
  targetId: z.boolean().optional(),
  result: z.boolean().optional(),
  caster: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  target: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  verses: z.union([z.boolean(),z.lazy(() => MagicVersesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MagicVerseCastCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MAGIC VERSES
//------------------------------------------------------

export const MagicVersesIncludeSchema: z.ZodType<Prisma.MagicVersesInclude> = z.object({
  casts: z.union([z.boolean(),z.lazy(() => MagicVerseCastFindManyArgsSchema)]).optional(),
  sophomores: z.union([z.boolean(),z.lazy(() => SophomoreDetailsFindManyArgsSchema)]).optional(),
  starters: z.union([z.boolean(),z.lazy(() => StarterMagicVerseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MagicVersesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MagicVersesArgsSchema: z.ZodType<Prisma.MagicVersesArgs> = z.object({
  select: z.lazy(() => MagicVersesSelectSchema).optional(),
  include: z.lazy(() => MagicVersesIncludeSchema).optional(),
}).strict();

export const MagicVersesCountOutputTypeArgsSchema: z.ZodType<Prisma.MagicVersesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => MagicVersesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MagicVersesCountOutputTypeSelectSchema: z.ZodType<Prisma.MagicVersesCountOutputTypeSelect> = z.object({
  casts: z.boolean().optional(),
  sophomores: z.boolean().optional(),
  starters: z.boolean().optional(),
}).strict();

export const MagicVersesSelectSchema: z.ZodType<Prisma.MagicVersesSelect> = z.object({
  handler: z.boolean().optional(),
  name: z.boolean().optional(),
  wildcard: z.boolean().optional(),
  cost: z.boolean().optional(),
  casts: z.union([z.boolean(),z.lazy(() => MagicVerseCastFindManyArgsSchema)]).optional(),
  sophomores: z.union([z.boolean(),z.lazy(() => SophomoreDetailsFindManyArgsSchema)]).optional(),
  starters: z.union([z.boolean(),z.lazy(() => StarterMagicVerseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MagicVersesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SOPHOMORE DETAILS
//------------------------------------------------------

export const SophomoreDetailsIncludeSchema: z.ZodType<Prisma.SophomoreDetailsInclude> = z.object({
  hints: z.union([z.boolean(),z.lazy(() => HintsFindManyArgsSchema)]).optional(),
  PasscodeInstances: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  QRInstances: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  pair: z.union([z.boolean(),z.lazy(() => PairFindManyArgsSchema)]).optional(),
  verses: z.union([z.boolean(),z.lazy(() => MagicVersesFindManyArgsSchema)]).optional(),
  magicIdInstances: z.union([z.boolean(),z.lazy(() => MagicVerseIdentificationInstanceFindManyArgsSchema)]).optional(),
  starterVerses: z.union([z.boolean(),z.lazy(() => StarterMagicVerseFindManyArgsSchema)]).optional(),
  magicVersesCasted: z.union([z.boolean(),z.lazy(() => MagicVerseCastFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SophomoreDetailsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SophomoreDetailsArgsSchema: z.ZodType<Prisma.SophomoreDetailsArgs> = z.object({
  select: z.lazy(() => SophomoreDetailsSelectSchema).optional(),
  include: z.lazy(() => SophomoreDetailsIncludeSchema).optional(),
}).strict();

export const SophomoreDetailsCountOutputTypeArgsSchema: z.ZodType<Prisma.SophomoreDetailsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SophomoreDetailsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SophomoreDetailsCountOutputTypeSelectSchema: z.ZodType<Prisma.SophomoreDetailsCountOutputTypeSelect> = z.object({
  hints: z.boolean().optional(),
  PasscodeInstances: z.boolean().optional(),
  QRInstances: z.boolean().optional(),
  pair: z.boolean().optional(),
  verses: z.boolean().optional(),
  magicIdInstances: z.boolean().optional(),
  starterVerses: z.boolean().optional(),
  magicVersesCasted: z.boolean().optional(),
}).strict();

export const SophomoreDetailsSelectSchema: z.ZodType<Prisma.SophomoreDetailsSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  thisOrThat: z.boolean().optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.boolean().optional(),
  id: z.boolean().optional(),
  fullname: z.boolean().optional(),
  title: z.boolean().optional(),
  student_id: z.boolean().optional(),
  nickname: z.boolean().optional(),
  branch: z.boolean().optional(),
  participate: z.boolean().optional(),
  many_fresh: z.boolean().optional(),
  facebook_link: z.boolean().optional(),
  instagram_link: z.boolean().optional(),
  phone: z.boolean().optional(),
  hints: z.union([z.boolean(),z.lazy(() => HintsFindManyArgsSchema)]).optional(),
  PasscodeInstances: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  QRInstances: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  pair: z.union([z.boolean(),z.lazy(() => PairFindManyArgsSchema)]).optional(),
  verses: z.union([z.boolean(),z.lazy(() => MagicVersesFindManyArgsSchema)]).optional(),
  magicIdInstances: z.union([z.boolean(),z.lazy(() => MagicVerseIdentificationInstanceFindManyArgsSchema)]).optional(),
  starterVerses: z.union([z.boolean(),z.lazy(() => StarterMagicVerseFindManyArgsSchema)]).optional(),
  magicVersesCasted: z.union([z.boolean(),z.lazy(() => MagicVerseCastFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SophomoreDetailsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TODAY RESIN
//------------------------------------------------------

export const TodayResinIncludeSchema: z.ZodType<Prisma.TodayResinInclude> = z.object({
  freshmen: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
}).strict()

export const TodayResinArgsSchema: z.ZodType<Prisma.TodayResinArgs> = z.object({
  select: z.lazy(() => TodayResinSelectSchema).optional(),
  include: z.lazy(() => TodayResinIncludeSchema).optional(),
}).strict();

export const TodayResinSelectSchema: z.ZodType<Prisma.TodayResinSelect> = z.object({
  id: z.boolean().optional(),
  create_at: z.boolean().optional(),
  quota: z.boolean().optional(),
  freshmenDetailsId: z.boolean().optional(),
  freshmen: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional()
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional()
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumPlayerTypeFilterSchema),z.lazy(() => PlayerTypeSchema) ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  factionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  freshmenDetails: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  sophomoreDetails: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional().nullable(),
  faction: z.union([ z.lazy(() => FactionsRelationFilterSchema),z.lazy(() => FactionsWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  factionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  faction: z.lazy(() => FactionsOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  factionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumPlayerTypeWithAggregatesFilterSchema),z.lazy(() => PlayerTypeSchema) ]).optional(),
  balance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  factionId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const QRInstancesWhereInputSchema: z.ZodType<Prisma.QRInstancesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QRInstancesWhereInputSchema),z.lazy(() => QRInstancesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QRInstancesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QRInstancesWhereInputSchema),z.lazy(() => QRInstancesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quota: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsListRelationFilterSchema).optional()
}).strict();

export const QRInstancesOrderByWithRelationInputSchema: z.ZodType<Prisma.QRInstancesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const QRInstancesWhereUniqueInputSchema: z.ZodType<Prisma.QRInstancesWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  secret: z.string().optional()
}).strict();

export const QRInstancesOrderByWithAggregationInputSchema: z.ZodType<Prisma.QRInstancesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QRInstancesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QRInstancesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QRInstancesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QRInstancesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QRInstancesSumOrderByAggregateInputSchema).optional()
}).strict();

export const QRInstancesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QRInstancesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quota: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  secret: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PasscodeInstancesWhereInputSchema: z.ZodType<Prisma.PasscodeInstancesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasscodeInstancesWhereInputSchema),z.lazy(() => PasscodeInstancesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasscodeInstancesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasscodeInstancesWhereInputSchema),z.lazy(() => PasscodeInstancesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  usedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
  usedBy: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PasscodeInstancesOrderByWithRelationInputSchema: z.ZodType<Prisma.PasscodeInstancesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  usedBy: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const PasscodeInstancesWhereUniqueInputSchema: z.ZodType<Prisma.PasscodeInstancesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string().optional()
}).strict();

export const PasscodeInstancesOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasscodeInstancesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasscodeInstancesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasscodeInstancesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasscodeInstancesMinOrderByAggregateInputSchema).optional()
}).strict();

export const PasscodeInstancesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasscodeInstancesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasscodeInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => PasscodeInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasscodeInstancesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasscodeInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => PasscodeInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  usedById: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FactionsWhereInputSchema: z.ZodType<Prisma.FactionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FactionsWhereInputSchema),z.lazy(() => FactionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FactionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FactionsWhereInputSchema),z.lazy(() => FactionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  handler: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const FactionsOrderByWithRelationInputSchema: z.ZodType<Prisma.FactionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FactionsWhereUniqueInputSchema: z.ZodType<Prisma.FactionsWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FactionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FactionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FactionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FactionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FactionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const FactionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FactionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FactionsScalarWhereWithAggregatesInputSchema),z.lazy(() => FactionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FactionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FactionsScalarWhereWithAggregatesInputSchema),z.lazy(() => FactionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  handler: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RevealedHintInstancesWhereInputSchema: z.ZodType<Prisma.RevealedHintInstancesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RevealedHintInstancesWhereInputSchema),z.lazy(() => RevealedHintInstancesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RevealedHintInstancesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RevealedHintInstancesWhereInputSchema),z.lazy(() => RevealedHintInstancesWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hintsHintSlugId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hintsSophomoreId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pairId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hint: z.union([ z.lazy(() => HintsRelationFilterSchema),z.lazy(() => HintsWhereInputSchema) ]).optional(),
  pair: z.union([ z.lazy(() => PairRelationFilterSchema),z.lazy(() => PairWhereInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesOrderByWithRelationInputSchema: z.ZodType<Prisma.RevealedHintInstancesOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  hintsHintSlugId: z.lazy(() => SortOrderSchema).optional(),
  hintsSophomoreId: z.lazy(() => SortOrderSchema).optional(),
  pairId: z.lazy(() => SortOrderSchema).optional(),
  hint: z.lazy(() => HintsOrderByWithRelationInputSchema).optional(),
  pair: z.lazy(() => PairOrderByWithRelationInputSchema).optional()
}).strict();

export const RevealedHintInstancesWhereUniqueInputSchema: z.ZodType<Prisma.RevealedHintInstancesWhereUniqueInput> = z.object({
  hintsHintSlugId_hintsSophomoreId_pairId: z.lazy(() => RevealedHintInstancesHintsHintSlugIdHintsSophomoreIdPairIdCompoundUniqueInputSchema).optional()
}).strict();

export const RevealedHintInstancesOrderByWithAggregationInputSchema: z.ZodType<Prisma.RevealedHintInstancesOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  hintsHintSlugId: z.lazy(() => SortOrderSchema).optional(),
  hintsSophomoreId: z.lazy(() => SortOrderSchema).optional(),
  pairId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RevealedHintInstancesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RevealedHintInstancesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RevealedHintInstancesMinOrderByAggregateInputSchema).optional()
}).strict();

export const RevealedHintInstancesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RevealedHintInstancesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RevealedHintInstancesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  hintsHintSlugId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hintsSophomoreId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pairId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PairWhereInputSchema: z.ZodType<Prisma.PairWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PairWhereInputSchema),z.lazy(() => PairWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PairWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PairWhereInputSchema),z.lazy(() => PairWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  freshmen: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional(),
  sophomore: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesListRelationFilterSchema).optional()
}).strict();

export const PairOrderByWithRelationInputSchema: z.ZodType<Prisma.PairOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  freshmen: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PairWhereUniqueInputSchema: z.ZodType<Prisma.PairWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
<<<<<<< HEAD
  freshmenDetailsId: z.string().optional(),
  sophomoreDetailsId: z.string().optional()
=======
  freshmenDetailsId: z.string().optional()
<<<<<<< HEAD

>>>>>>> dev/1.1
=======
>>>>>>> dev/1.1
}).strict();

export const PairOrderByWithAggregationInputSchema: z.ZodType<Prisma.PairOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PairCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PairMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PairMinOrderByAggregateInputSchema).optional()
}).strict();

export const PairScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PairScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PairScalarWhereWithAggregatesInputSchema),z.lazy(() => PairScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PairScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PairScalarWhereWithAggregatesInputSchema),z.lazy(() => PairScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FreshmenDetailsWhereInputSchema: z.ZodType<Prisma.FreshmenDetailsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FreshmenDetailsWhereInputSchema),z.lazy(() => FreshmenDetailsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FreshmenDetailsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FreshmenDetailsWhereInputSchema),z.lazy(() => FreshmenDetailsWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  student_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passcodePoints: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  easterEgg: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  vip: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesListRelationFilterSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesListRelationFilterSchema).optional(),
  pair: z.union([ z.lazy(() => PairRelationFilterSchema),z.lazy(() => PairWhereInputSchema) ]).optional().nullable(),
  todayResin: z.lazy(() => TodayResinListRelationFilterSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseListRelationFilterSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastListRelationFilterSchema).optional()
}).strict();

export const FreshmenDetailsOrderByWithRelationInputSchema: z.ZodType<Prisma.FreshmenDetailsOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  passcodePoints: z.lazy(() => SortOrderSchema).optional(),
  easterEgg: z.lazy(() => SortOrderSchema).optional(),
  vip: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesOrderByRelationAggregateInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesOrderByRelationAggregateInputSchema).optional(),
  pair: z.lazy(() => PairOrderByWithRelationInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinOrderByRelationAggregateInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseOrderByRelationAggregateInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FreshmenDetailsWhereUniqueInputSchema: z.ZodType<Prisma.FreshmenDetailsWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  student_id: z.string().optional()
}).strict();

export const FreshmenDetailsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FreshmenDetailsOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  passcodePoints: z.lazy(() => SortOrderSchema).optional(),
  easterEgg: z.lazy(() => SortOrderSchema).optional(),
  vip: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FreshmenDetailsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FreshmenDetailsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FreshmenDetailsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FreshmenDetailsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FreshmenDetailsSumOrderByAggregateInputSchema).optional()
}).strict();

export const FreshmenDetailsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FreshmenDetailsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FreshmenDetailsScalarWhereWithAggregatesInputSchema),z.lazy(() => FreshmenDetailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FreshmenDetailsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FreshmenDetailsScalarWhereWithAggregatesInputSchema),z.lazy(() => FreshmenDetailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  student_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleWithAggregatesFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchWithAggregatesFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  instagram_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passcodePoints: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  easterEgg: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  vip: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const HintSlugsWhereInputSchema: z.ZodType<Prisma.HintSlugsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HintSlugsWhereInputSchema),z.lazy(() => HintSlugsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintSlugsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintSlugsWhereInputSchema),z.lazy(() => HintSlugsWhereInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  Hints: z.lazy(() => HintsListRelationFilterSchema).optional()
}).strict();

export const HintSlugsOrderByWithRelationInputSchema: z.ZodType<Prisma.HintSlugsOrderByWithRelationInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  index: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Hints: z.lazy(() => HintsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const HintSlugsWhereUniqueInputSchema: z.ZodType<Prisma.HintSlugsWhereUniqueInput> = z.object({
  slug: z.string().optional(),
  index: z.number().int().optional()
}).strict();

export const HintSlugsOrderByWithAggregationInputSchema: z.ZodType<Prisma.HintSlugsOrderByWithAggregationInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  index: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => HintSlugsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HintSlugsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HintSlugsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HintSlugsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HintSlugsSumOrderByAggregateInputSchema).optional()
}).strict();

export const HintSlugsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HintSlugsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema),z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema),z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const HintsWhereInputSchema: z.ZodType<Prisma.HintsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HintsWhereInputSchema),z.lazy(() => HintsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintsWhereInputSchema),z.lazy(() => HintsWhereInputSchema).array() ]).optional(),
  hintSlugId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  craete_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  slug: z.union([ z.lazy(() => HintSlugsRelationFilterSchema),z.lazy(() => HintSlugsWhereInputSchema) ]).optional(),
  sophomore: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesListRelationFilterSchema).optional()
}).strict();

export const HintsOrderByWithRelationInputSchema: z.ZodType<Prisma.HintsOrderByWithRelationInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
  craete_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => HintSlugsOrderByWithRelationInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const HintsWhereUniqueInputSchema: z.ZodType<Prisma.HintsWhereUniqueInput> = z.object({
  hintSlugId_sophomoreId: z.lazy(() => HintsHintSlugIdSophomoreIdCompoundUniqueInputSchema).optional()
}).strict();

export const HintsOrderByWithAggregationInputSchema: z.ZodType<Prisma.HintsOrderByWithAggregationInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
  craete_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HintsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HintsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HintsMinOrderByAggregateInputSchema).optional()
}).strict();

export const HintsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HintsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HintsScalarWhereWithAggregatesInputSchema),z.lazy(() => HintsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintsScalarWhereWithAggregatesInputSchema),z.lazy(() => HintsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  hintSlugId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sophomoreId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  craete_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceWhereInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isExpired: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  sophomoreDetails: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceOrderByWithRelationInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  isExpired: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceWhereUniqueInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string().optional()
}).strict();

export const MagicVerseIdentificationInstanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  isExpired: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MagicVerseIdentificationInstanceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MagicVerseIdentificationInstanceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MagicVerseIdentificationInstanceMinOrderByAggregateInputSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema),z.lazy(() => MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema),z.lazy(() => MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isExpired: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const StarterMagicVerseWhereInputSchema: z.ZodType<Prisma.StarterMagicVerseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarterMagicVerseWhereInputSchema),z.lazy(() => StarterMagicVerseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarterMagicVerseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarterMagicVerseWhereInputSchema),z.lazy(() => StarterMagicVerseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  verses: z.lazy(() => MagicVersesListRelationFilterSchema).optional(),
  fresh: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional(),
  sophomore: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseOrderByWithRelationInputSchema: z.ZodType<Prisma.StarterMagicVerseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  verses: z.lazy(() => MagicVersesOrderByRelationAggregateInputSchema).optional(),
  fresh: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const StarterMagicVerseWhereUniqueInputSchema: z.ZodType<Prisma.StarterMagicVerseWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sophomoreDetailsId_freshmenDetailsId: z.lazy(() => StarterMagicVerseSophomoreDetailsIdFreshmenDetailsIdCompoundUniqueInputSchema).optional()
}).strict();

export const StarterMagicVerseOrderByWithAggregationInputSchema: z.ZodType<Prisma.StarterMagicVerseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StarterMagicVerseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StarterMagicVerseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StarterMagicVerseMinOrderByAggregateInputSchema).optional()
}).strict();

export const StarterMagicVerseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StarterMagicVerseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StarterMagicVerseScalarWhereWithAggregatesInputSchema),z.lazy(() => StarterMagicVerseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarterMagicVerseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarterMagicVerseScalarWhereWithAggregatesInputSchema),z.lazy(() => StarterMagicVerseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MagicVerseCastWhereInputSchema: z.ZodType<Prisma.MagicVerseCastWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVerseCastWhereInputSchema),z.lazy(() => MagicVerseCastWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVerseCastWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVerseCastWhereInputSchema),z.lazy(() => MagicVerseCastWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  casterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  result: z.lazy(() => BoolNullableListFilterSchema).optional(),
  caster: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional(),
  target: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesListRelationFilterSchema).optional()
}).strict();

export const MagicVerseCastOrderByWithRelationInputSchema: z.ZodType<Prisma.MagicVerseCastOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  casterId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  result: z.lazy(() => SortOrderSchema).optional(),
  caster: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  target: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  verses: z.lazy(() => MagicVersesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MagicVerseCastWhereUniqueInputSchema: z.ZodType<Prisma.MagicVerseCastWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const MagicVerseCastOrderByWithAggregationInputSchema: z.ZodType<Prisma.MagicVerseCastOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  casterId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  result: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MagicVerseCastCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MagicVerseCastMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MagicVerseCastMinOrderByAggregateInputSchema).optional()
}).strict();

export const MagicVerseCastScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MagicVerseCastScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVerseCastScalarWhereWithAggregatesInputSchema),z.lazy(() => MagicVerseCastScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVerseCastScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVerseCastScalarWhereWithAggregatesInputSchema),z.lazy(() => MagicVerseCastScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  casterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  result: z.lazy(() => BoolNullableListFilterSchema).optional()
}).strict();

export const MagicVersesWhereInputSchema: z.ZodType<Prisma.MagicVersesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVersesWhereInputSchema),z.lazy(() => MagicVersesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVersesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVersesWhereInputSchema),z.lazy(() => MagicVersesWhereInputSchema).array() ]).optional(),
  handler: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  wildcard: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  cost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  casts: z.lazy(() => MagicVerseCastListRelationFilterSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsListRelationFilterSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseListRelationFilterSchema).optional()
}).strict();

export const MagicVersesOrderByWithRelationInputSchema: z.ZodType<Prisma.MagicVersesOrderByWithRelationInput> = z.object({
  handler: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wildcard: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  casts: z.lazy(() => MagicVerseCastOrderByRelationAggregateInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsOrderByRelationAggregateInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MagicVersesWhereUniqueInputSchema: z.ZodType<Prisma.MagicVersesWhereUniqueInput> = z.object({
  handler: z.string().optional()
}).strict();

export const MagicVersesOrderByWithAggregationInputSchema: z.ZodType<Prisma.MagicVersesOrderByWithAggregationInput> = z.object({
  handler: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wildcard: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MagicVersesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MagicVersesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MagicVersesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MagicVersesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MagicVersesSumOrderByAggregateInputSchema).optional()
}).strict();

export const MagicVersesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MagicVersesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVersesScalarWhereWithAggregatesInputSchema),z.lazy(() => MagicVersesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVersesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVersesScalarWhereWithAggregatesInputSchema),z.lazy(() => MagicVersesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  handler: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  wildcard: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  cost: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const SophomoreDetailsWhereInputSchema: z.ZodType<Prisma.SophomoreDetailsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SophomoreDetailsWhereInputSchema),z.lazy(() => SophomoreDetailsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SophomoreDetailsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SophomoreDetailsWhereInputSchema),z.lazy(() => SophomoreDetailsWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hintsReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  student_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  participate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  many_fresh: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hints: z.lazy(() => HintsListRelationFilterSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesListRelationFilterSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  pair: z.lazy(() => PairListRelationFilterSchema).optional(),
  verses: z.lazy(() => MagicVersesListRelationFilterSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceListRelationFilterSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseListRelationFilterSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastListRelationFilterSchema).optional()
}).strict();

export const SophomoreDetailsOrderByWithRelationInputSchema: z.ZodType<Prisma.SophomoreDetailsOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  participate: z.lazy(() => SortOrderSchema).optional(),
  many_fresh: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  hints: z.lazy(() => HintsOrderByRelationAggregateInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesOrderByRelationAggregateInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  pair: z.lazy(() => PairOrderByRelationAggregateInputSchema).optional(),
  verses: z.lazy(() => MagicVersesOrderByRelationAggregateInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceOrderByRelationAggregateInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseOrderByRelationAggregateInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SophomoreDetailsWhereUniqueInputSchema: z.ZodType<Prisma.SophomoreDetailsWhereUniqueInput> = z.object({
  userId: z.string().optional(),
  id: z.string().cuid().optional(),
  student_id: z.string().optional()
}).strict();

export const SophomoreDetailsOrderByWithAggregationInputSchema: z.ZodType<Prisma.SophomoreDetailsOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  participate: z.lazy(() => SortOrderSchema).optional(),
  many_fresh: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  instagram_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SophomoreDetailsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SophomoreDetailsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SophomoreDetailsMinOrderByAggregateInputSchema).optional()
}).strict();

export const SophomoreDetailsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SophomoreDetailsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SophomoreDetailsScalarWhereWithAggregatesInputSchema),z.lazy(() => SophomoreDetailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SophomoreDetailsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SophomoreDetailsScalarWhereWithAggregatesInputSchema),z.lazy(() => SophomoreDetailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  hintsReady: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleWithAggregatesFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  student_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchWithAggregatesFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  participate: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  many_fresh: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  instagram_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TodayResinWhereInputSchema: z.ZodType<Prisma.TodayResinWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TodayResinWhereInputSchema),z.lazy(() => TodayResinWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodayResinWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodayResinWhereInputSchema),z.lazy(() => TodayResinWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quota: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  freshmen: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional(),
}).strict();

export const TodayResinOrderByWithRelationInputSchema: z.ZodType<Prisma.TodayResinOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  freshmen: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const TodayResinWhereUniqueInputSchema: z.ZodType<Prisma.TodayResinWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const TodayResinOrderByWithAggregationInputSchema: z.ZodType<Prisma.TodayResinOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TodayResinCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TodayResinAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TodayResinMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TodayResinMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TodayResinSumOrderByAggregateInputSchema).optional()
}).strict();

export const TodayResinScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TodayResinScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TodayResinScalarWhereWithAggregatesInputSchema),z.lazy(() => TodayResinScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodayResinScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodayResinScalarWhereWithAggregatesInputSchema),z.lazy(() => TodayResinScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  quota: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  faction: z.lazy(() => FactionsCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  faction: z.lazy(() => FactionsUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesCreateInputSchema: z.ZodType<Prisma.QRInstancesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  secret: z.string(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutQRInstancesInputSchema),
  scannedBy: z.lazy(() => FreshmenDetailsCreateNestedManyWithoutScannedQrsInputSchema).optional()
}).strict();

export const QRInstancesUncheckedCreateInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string(),
  quota: z.number().int().optional(),
  secret: z.string(),
  scannedBy: z.lazy(() => FreshmenDetailsUncheckedCreateNestedManyWithoutScannedQrsInputSchema).optional()
}).strict();

export const QRInstancesUpdateInputSchema: z.ZodType<Prisma.QRInstancesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInputSchema).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsUpdateManyWithoutScannedQrsNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsUncheckedUpdateManyWithoutScannedQrsNestedInputSchema).optional()
}).strict();

export const QRInstancesCreateManyInputSchema: z.ZodType<Prisma.QRInstancesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string(),
  quota: z.number().int().optional(),
  secret: z.string()
}).strict();

export const QRInstancesUpdateManyMutationInputSchema: z.ZodType<Prisma.QRInstancesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesCreateInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  content: z.string(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInputSchema),
  usedBy: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedCreateInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string()
}).strict();

export const PasscodeInstancesUpdateInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInputSchema).optional(),
  usedBy: z.lazy(() => FreshmenDetailsUpdateOneWithoutUsedPasscodesNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedUpdateInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesCreateManyInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string()
}).strict();

export const PasscodeInstancesUpdateManyMutationInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FactionsCreateInputSchema: z.ZodType<Prisma.FactionsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutFactionInputSchema).optional()
}).strict();

export const FactionsUncheckedCreateInputSchema: z.ZodType<Prisma.FactionsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutFactionInputSchema).optional()
}).strict();

export const FactionsUpdateInputSchema: z.ZodType<Prisma.FactionsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutFactionNestedInputSchema).optional()
}).strict();

export const FactionsUncheckedUpdateInputSchema: z.ZodType<Prisma.FactionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutFactionNestedInputSchema).optional()
}).strict();

export const FactionsCreateManyInputSchema: z.ZodType<Prisma.FactionsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const FactionsUpdateManyMutationInputSchema: z.ZodType<Prisma.FactionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FactionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FactionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesCreateInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  hint: z.lazy(() => HintsCreateNestedOneWithoutRevealedHintInstancesInputSchema),
  pair: z.lazy(() => PairCreateNestedOneWithoutRevealedHintsInputSchema)
}).strict();

export const RevealedHintInstancesUncheckedCreateInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  hintsHintSlugId: z.string(),
  hintsSophomoreId: z.string(),
  pairId: z.string()
}).strict();

export const RevealedHintInstancesUpdateInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hint: z.lazy(() => HintsUpdateOneRequiredWithoutRevealedHintInstancesNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneRequiredWithoutRevealedHintsNestedInputSchema).optional()
}).strict();

export const RevealedHintInstancesUncheckedUpdateInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hintsHintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hintsSophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pairId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesCreateManyInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  hintsHintSlugId: z.string(),
  hintsSophomoreId: z.string(),
  pairId: z.string()
}).strict();

export const RevealedHintInstancesUpdateManyMutationInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hintsHintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hintsSophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pairId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PairCreateInputSchema: z.ZodType<Prisma.PairCreateInput> = z.object({
  id: z.string().cuid().optional(),
  freshmen: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutPairInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPairInputSchema),
  revealedHints: z.lazy(() => RevealedHintInstancesCreateNestedManyWithoutPairInputSchema).optional()
}).strict();

export const PairUncheckedCreateInputSchema: z.ZodType<Prisma.PairUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string(),
  revealedHints: z.lazy(() => RevealedHintInstancesUncheckedCreateNestedManyWithoutPairInputSchema).optional()
}).strict();

export const PairUpdateInputSchema: z.ZodType<Prisma.PairUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmen: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutPairNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPairNestedInputSchema).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesUpdateManyWithoutPairNestedInputSchema).optional()
}).strict();

export const PairUncheckedUpdateInputSchema: z.ZodType<Prisma.PairUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutPairNestedInputSchema).optional()
}).strict();

export const PairCreateManyInputSchema: z.ZodType<Prisma.PairCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string()
}).strict();

export const PairUpdateManyMutationInputSchema: z.ZodType<Prisma.PairUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PairUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PairUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsCreateInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUpdateInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateManyInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional()
}).strict();

export const FreshmenDetailsUpdateManyMutationInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintSlugsCreateInputSchema: z.ZodType<Prisma.HintSlugsCreateInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  index: z.number().int().optional().nullable(),
  Hints: z.lazy(() => HintsCreateNestedManyWithoutSlugInputSchema).optional()
}).strict();

export const HintSlugsUncheckedCreateInputSchema: z.ZodType<Prisma.HintSlugsUncheckedCreateInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  index: z.number().int().optional().nullable(),
  Hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSlugInputSchema).optional()
}).strict();

export const HintSlugsUpdateInputSchema: z.ZodType<Prisma.HintSlugsUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Hints: z.lazy(() => HintsUpdateManyWithoutSlugNestedInputSchema).optional()
}).strict();

export const HintSlugsUncheckedUpdateInputSchema: z.ZodType<Prisma.HintSlugsUncheckedUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSlugNestedInputSchema).optional()
}).strict();

export const HintSlugsCreateManyInputSchema: z.ZodType<Prisma.HintSlugsCreateManyInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  index: z.number().int().optional().nullable()
}).strict();

export const HintSlugsUpdateManyMutationInputSchema: z.ZodType<Prisma.HintSlugsUpdateManyMutationInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HintSlugsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HintSlugsUncheckedUpdateManyInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HintsCreateInputSchema: z.ZodType<Prisma.HintsCreateInput> = z.object({
  content: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  slug: z.lazy(() => HintSlugsCreateNestedOneWithoutHintsInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutHintsInputSchema),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesCreateNestedManyWithoutHintInputSchema).optional()
}).strict();

export const HintsUncheckedCreateInputSchema: z.ZodType<Prisma.HintsUncheckedCreateInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUncheckedCreateNestedManyWithoutHintInputSchema).optional()
}).strict();

export const HintsUpdateInputSchema: z.ZodType<Prisma.HintsUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.lazy(() => HintSlugsUpdateOneRequiredWithoutHintsNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInputSchema).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUpdateManyWithoutHintNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutHintNestedInputSchema).optional()
}).strict();

export const HintsCreateManyInputSchema: z.ZodType<Prisma.HintsCreateManyInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const HintsUpdateManyMutationInputSchema: z.ZodType<Prisma.HintsUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateManyInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceCreateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  content: z.string(),
  isExpired: z.boolean().optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutMagicIdInstancesInputSchema)
}).strict();

export const MagicVerseIdentificationInstanceUncheckedCreateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  content: z.string(),
  sophomoreDetailsId: z.string(),
  isExpired: z.boolean().optional()
}).strict();

export const MagicVerseIdentificationInstanceUpdateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutMagicIdInstancesNestedInputSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceUncheckedUpdateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceCreateManyInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  content: z.string(),
  sophomoreDetailsId: z.string(),
  isExpired: z.boolean().optional()
}).strict();

export const MagicVerseIdentificationInstanceUpdateManyMutationInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseCreateInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutStartersInputSchema).optional(),
  fresh: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutStarterMagicVerseInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutStarterVersesInputSchema)
}).strict();

export const StarterMagicVerseUncheckedCreateInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutStartersInputSchema).optional()
}).strict();

export const StarterMagicVerseUpdateInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutStartersNestedInputSchema).optional(),
  fresh: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutStarterMagicVerseNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutStarterVersesNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseUncheckedUpdateInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutStartersNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseCreateManyInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string()
}).strict();

export const StarterMagicVerseUpdateManyMutationInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseCastCreateInputSchema: z.ZodType<Prisma.MagicVerseCastCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  caster: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutMagicVerseCastInputSchema),
  target: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutMagicVersesCastedInputSchema),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutCastsInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedCreateInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  casterId: z.string(),
  targetId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutCastsInputSchema).optional()
}).strict();

export const MagicVerseCastUpdateInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  caster: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutMagicVerseCastNestedInputSchema).optional(),
  target: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutMagicVersesCastedNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutCastsNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedUpdateInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  casterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutCastsNestedInputSchema).optional()
}).strict();

export const MagicVerseCastCreateManyInputSchema: z.ZodType<Prisma.MagicVerseCastCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  casterId: z.string(),
  targetId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const MagicVerseCastUpdateManyMutationInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  casterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const MagicVersesCreateInputSchema: z.ZodType<Prisma.MagicVersesCreateInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  casts: z.lazy(() => MagicVerseCastCreateNestedManyWithoutVersesInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsCreateNestedManyWithoutVersesInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesUncheckedCreateInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  casts: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutVersesInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUncheckedCreateNestedManyWithoutVersesInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesUpdateInputSchema: z.ZodType<Prisma.MagicVersesUpdateInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  casts: z.lazy(() => MagicVerseCastUpdateManyWithoutVersesNestedInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUpdateManyWithoutVersesNestedInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVersesUncheckedUpdateInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  casts: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutVersesNestedInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUncheckedUpdateManyWithoutVersesNestedInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVersesCreateManyInputSchema: z.ZodType<Prisma.MagicVersesCreateManyInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional()
}).strict();

export const MagicVersesUpdateManyMutationInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyMutationInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVersesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateManyInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsCreateInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUpdateInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateManyInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string()
}).strict();

export const SophomoreDetailsUpdateManyMutationInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodayResinCreateInputSchema: z.ZodType<Prisma.TodayResinCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  freshmen: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutTodayResinInputSchema)
}).strict();

export const TodayResinUncheckedCreateInputSchema: z.ZodType<Prisma.TodayResinUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  freshmenDetailsId: z.string()
}).strict();

export const TodayResinUpdateInputSchema: z.ZodType<Prisma.TodayResinUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  freshmen: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutTodayResinNestedInputSchema).optional()
}).strict();

export const TodayResinUncheckedUpdateInputSchema: z.ZodType<Prisma.TodayResinUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodayResinCreateManyInputSchema: z.ZodType<Prisma.TodayResinCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  freshmenDetailsId: z.string()
}).strict();

export const TodayResinUpdateManyMutationInputSchema: z.ZodType<Prisma.TodayResinUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodayResinUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TodayResinUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumPlayerTypeFilterSchema: z.ZodType<Prisma.EnumPlayerTypeFilter> = z.object({
  equals: z.lazy(() => PlayerTypeSchema).optional(),
  in: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => NestedEnumPlayerTypeFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const FreshmenDetailsRelationFilterSchema: z.ZodType<Prisma.FreshmenDetailsRelationFilter> = z.object({
  is: z.lazy(() => FreshmenDetailsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FreshmenDetailsWhereInputSchema).optional().nullable()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SophomoreDetailsRelationFilterSchema: z.ZodType<Prisma.SophomoreDetailsRelationFilter> = z.object({
  is: z.lazy(() => SophomoreDetailsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SophomoreDetailsWhereInputSchema).optional().nullable()
}).strict();

export const FactionsRelationFilterSchema: z.ZodType<Prisma.FactionsRelationFilter> = z.object({
  is: z.lazy(() => FactionsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FactionsWhereInputSchema).optional().nullable()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  factionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  factionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  factionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumPlayerTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPlayerTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlayerTypeSchema).optional(),
  in: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => NestedEnumPlayerTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlayerTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlayerTypeFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsListRelationFilterSchema: z.ZodType<Prisma.FreshmenDetailsListRelationFilter> = z.object({
  every: z.lazy(() => FreshmenDetailsWhereInputSchema).optional(),
  some: z.lazy(() => FreshmenDetailsWhereInputSchema).optional(),
  none: z.lazy(() => FreshmenDetailsWhereInputSchema).optional()
}).strict();

export const FreshmenDetailsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesCountOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesAvgOrderByAggregateInput> = z.object({
  quota: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesMinOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesSumOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesSumOrderByAggregateInput> = z.object({
  quota: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasscodeInstancesCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasscodeInstancesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasscodeInstancesMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FactionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FactionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FactionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FactionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FactionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FactionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintsRelationFilterSchema: z.ZodType<Prisma.HintsRelationFilter> = z.object({
  is: z.lazy(() => HintsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => HintsWhereInputSchema).optional().nullable()
}).strict();

export const PairRelationFilterSchema: z.ZodType<Prisma.PairRelationFilter> = z.object({
  is: z.lazy(() => PairWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PairWhereInputSchema).optional().nullable()
}).strict();

export const RevealedHintInstancesHintsHintSlugIdHintsSophomoreIdPairIdCompoundUniqueInputSchema: z.ZodType<Prisma.RevealedHintInstancesHintsHintSlugIdHintsSophomoreIdPairIdCompoundUniqueInput> = z.object({
  hintsHintSlugId: z.string(),
  hintsSophomoreId: z.string(),
  pairId: z.string()
}).strict();

export const RevealedHintInstancesCountOrderByAggregateInputSchema: z.ZodType<Prisma.RevealedHintInstancesCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  hintsHintSlugId: z.lazy(() => SortOrderSchema).optional(),
  hintsSophomoreId: z.lazy(() => SortOrderSchema).optional(),
  pairId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RevealedHintInstancesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RevealedHintInstancesMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  hintsHintSlugId: z.lazy(() => SortOrderSchema).optional(),
  hintsSophomoreId: z.lazy(() => SortOrderSchema).optional(),
  pairId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RevealedHintInstancesMinOrderByAggregateInputSchema: z.ZodType<Prisma.RevealedHintInstancesMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  hintsHintSlugId: z.lazy(() => SortOrderSchema).optional(),
  hintsSophomoreId: z.lazy(() => SortOrderSchema).optional(),
  pairId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RevealedHintInstancesListRelationFilterSchema: z.ZodType<Prisma.RevealedHintInstancesListRelationFilter> = z.object({
  every: z.lazy(() => RevealedHintInstancesWhereInputSchema).optional(),
  some: z.lazy(() => RevealedHintInstancesWhereInputSchema).optional(),
  none: z.lazy(() => RevealedHintInstancesWhereInputSchema).optional()
}).strict();

export const RevealedHintInstancesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RevealedHintInstancesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PairCountOrderByAggregateInputSchema: z.ZodType<Prisma.PairCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PairMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PairMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PairMinOrderByAggregateInputSchema: z.ZodType<Prisma.PairMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumThisOrThatNullableListFilterSchema: z.ZodType<Prisma.EnumThisOrThatNullableListFilter> = z.object({
  equals: z.lazy(() => ThisOrThatSchema).array().optional().nullable(),
  has: z.lazy(() => ThisOrThatSchema).optional().nullable(),
  hasEvery: z.lazy(() => ThisOrThatSchema).array().optional(),
  hasSome: z.lazy(() => ThisOrThatSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumNameTitleFilterSchema: z.ZodType<Prisma.EnumNameTitleFilter> = z.object({
  equals: z.lazy(() => NameTitleSchema).optional(),
  in: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  not: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => NestedEnumNameTitleFilterSchema) ]).optional(),
}).strict();

export const EnumBranchFilterSchema: z.ZodType<Prisma.EnumBranchFilter> = z.object({
  equals: z.lazy(() => BranchSchema).optional(),
  in: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  not: z.union([ z.lazy(() => BranchSchema),z.lazy(() => NestedEnumBranchFilterSchema) ]).optional(),
}).strict();

export const PasscodeInstancesListRelationFilterSchema: z.ZodType<Prisma.PasscodeInstancesListRelationFilter> = z.object({
  every: z.lazy(() => PasscodeInstancesWhereInputSchema).optional(),
  some: z.lazy(() => PasscodeInstancesWhereInputSchema).optional(),
  none: z.lazy(() => PasscodeInstancesWhereInputSchema).optional()
}).strict();

export const QRInstancesListRelationFilterSchema: z.ZodType<Prisma.QRInstancesListRelationFilter> = z.object({
  every: z.lazy(() => QRInstancesWhereInputSchema).optional(),
  some: z.lazy(() => QRInstancesWhereInputSchema).optional(),
  none: z.lazy(() => QRInstancesWhereInputSchema).optional()
}).strict();

export const TodayResinListRelationFilterSchema: z.ZodType<Prisma.TodayResinListRelationFilter> = z.object({
  every: z.lazy(() => TodayResinWhereInputSchema).optional(),
  some: z.lazy(() => TodayResinWhereInputSchema).optional(),
  none: z.lazy(() => TodayResinWhereInputSchema).optional()
}).strict();

export const StarterMagicVerseListRelationFilterSchema: z.ZodType<Prisma.StarterMagicVerseListRelationFilter> = z.object({
  every: z.lazy(() => StarterMagicVerseWhereInputSchema).optional(),
  some: z.lazy(() => StarterMagicVerseWhereInputSchema).optional(),
  none: z.lazy(() => StarterMagicVerseWhereInputSchema).optional()
}).strict();

export const MagicVerseCastListRelationFilterSchema: z.ZodType<Prisma.MagicVerseCastListRelationFilter> = z.object({
  every: z.lazy(() => MagicVerseCastWhereInputSchema).optional(),
  some: z.lazy(() => MagicVerseCastWhereInputSchema).optional(),
  none: z.lazy(() => MagicVerseCastWhereInputSchema).optional()
}).strict();

export const PasscodeInstancesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QRInstancesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodayResinOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TodayResinOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarterMagicVerseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StarterMagicVerseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseCastOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MagicVerseCastOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.lazy(() => SortOrderSchema).optional(),
  instagram_link: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  passcodePoints: z.lazy(() => SortOrderSchema).optional(),
  easterEgg: z.lazy(() => SortOrderSchema).optional(),
  vip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsAvgOrderByAggregateInput> = z.object({
  passcodePoints: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.lazy(() => SortOrderSchema).optional(),
  instagram_link: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  passcodePoints: z.lazy(() => SortOrderSchema).optional(),
  easterEgg: z.lazy(() => SortOrderSchema).optional(),
  vip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.lazy(() => SortOrderSchema).optional(),
  instagram_link: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  passcodePoints: z.lazy(() => SortOrderSchema).optional(),
  easterEgg: z.lazy(() => SortOrderSchema).optional(),
  vip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsSumOrderByAggregateInput> = z.object({
  passcodePoints: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumNameTitleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNameTitleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NameTitleSchema).optional(),
  in: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  not: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => NestedEnumNameTitleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNameTitleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNameTitleFilterSchema).optional()
}).strict();

export const EnumBranchWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBranchWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BranchSchema).optional(),
  in: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  not: z.union([ z.lazy(() => BranchSchema),z.lazy(() => NestedEnumBranchWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBranchFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBranchFilterSchema).optional()
}).strict();

export const HintsListRelationFilterSchema: z.ZodType<Prisma.HintsListRelationFilter> = z.object({
  every: z.lazy(() => HintsWhereInputSchema).optional(),
  some: z.lazy(() => HintsWhereInputSchema).optional(),
  none: z.lazy(() => HintsWhereInputSchema).optional()
}).strict();

export const HintsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HintsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsCountOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsCountOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsAvgOrderByAggregateInput> = z.object({
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsMaxOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsMinOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsMinOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsSumOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsSumOrderByAggregateInput> = z.object({
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsRelationFilterSchema: z.ZodType<Prisma.HintSlugsRelationFilter> = z.object({
  is: z.lazy(() => HintSlugsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => HintSlugsWhereInputSchema).optional().nullable()
}).strict();

export const HintsHintSlugIdSophomoreIdCompoundUniqueInputSchema: z.ZodType<Prisma.HintsHintSlugIdSophomoreIdCompoundUniqueInput> = z.object({
  hintSlugId: z.string(),
  sophomoreId: z.string()
}).strict();

export const HintsCountOrderByAggregateInputSchema: z.ZodType<Prisma.HintsCountOrderByAggregateInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
  craete_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HintsMaxOrderByAggregateInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
  craete_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintsMinOrderByAggregateInputSchema: z.ZodType<Prisma.HintsMinOrderByAggregateInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
  craete_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  isExpired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  isExpired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  isExpired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVersesListRelationFilterSchema: z.ZodType<Prisma.MagicVersesListRelationFilter> = z.object({
  every: z.lazy(() => MagicVersesWhereInputSchema).optional(),
  some: z.lazy(() => MagicVersesWhereInputSchema).optional(),
  none: z.lazy(() => MagicVersesWhereInputSchema).optional()
}).strict();

export const MagicVersesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MagicVersesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarterMagicVerseSophomoreDetailsIdFreshmenDetailsIdCompoundUniqueInputSchema: z.ZodType<Prisma.StarterMagicVerseSophomoreDetailsIdFreshmenDetailsIdCompoundUniqueInput> = z.object({
  sophomoreDetailsId: z.string(),
  freshmenDetailsId: z.string()
}).strict();

export const StarterMagicVerseCountOrderByAggregateInputSchema: z.ZodType<Prisma.StarterMagicVerseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarterMagicVerseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StarterMagicVerseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarterMagicVerseMinOrderByAggregateInputSchema: z.ZodType<Prisma.StarterMagicVerseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableListFilterSchema: z.ZodType<Prisma.BoolNullableListFilter> = z.object({
  equals: z.boolean().array().optional().nullable(),
  has: z.boolean().optional().nullable(),
  hasEvery: z.boolean().array().optional(),
  hasSome: z.boolean().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const MagicVerseCastCountOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVerseCastCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  casterId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  result: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseCastMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVerseCastMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  casterId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseCastMinOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVerseCastMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  casterId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const SophomoreDetailsListRelationFilterSchema: z.ZodType<Prisma.SophomoreDetailsListRelationFilter> = z.object({
  every: z.lazy(() => SophomoreDetailsWhereInputSchema).optional(),
  some: z.lazy(() => SophomoreDetailsWhereInputSchema).optional(),
  none: z.lazy(() => SophomoreDetailsWhereInputSchema).optional()
}).strict();

export const SophomoreDetailsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SophomoreDetailsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVersesCountOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVersesCountOrderByAggregateInput> = z.object({
  handler: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wildcard: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVersesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVersesAvgOrderByAggregateInput> = z.object({
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVersesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVersesMaxOrderByAggregateInput> = z.object({
  handler: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wildcard: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVersesMinOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVersesMinOrderByAggregateInput> = z.object({
  handler: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  wildcard: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVersesSumOrderByAggregateInputSchema: z.ZodType<Prisma.MagicVersesSumOrderByAggregateInput> = z.object({
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const PairListRelationFilterSchema: z.ZodType<Prisma.PairListRelationFilter> = z.object({
  every: z.lazy(() => PairWhereInputSchema).optional(),
  some: z.lazy(() => PairWhereInputSchema).optional(),
  none: z.lazy(() => PairWhereInputSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceListRelationFilterSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceListRelationFilter> = z.object({
  every: z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema).optional(),
  some: z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema).optional(),
  none: z.lazy(() => MagicVerseIdentificationInstanceWhereInputSchema).optional()
}).strict();

export const PairOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PairOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SophomoreDetailsCountOrderByAggregateInputSchema: z.ZodType<Prisma.SophomoreDetailsCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  participate: z.lazy(() => SortOrderSchema).optional(),
  many_fresh: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.lazy(() => SortOrderSchema).optional(),
  instagram_link: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SophomoreDetailsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SophomoreDetailsMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  participate: z.lazy(() => SortOrderSchema).optional(),
  many_fresh: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.lazy(() => SortOrderSchema).optional(),
  instagram_link: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SophomoreDetailsMinOrderByAggregateInputSchema: z.ZodType<Prisma.SophomoreDetailsMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  nickname: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => SortOrderSchema).optional(),
  participate: z.lazy(() => SortOrderSchema).optional(),
  many_fresh: z.lazy(() => SortOrderSchema).optional(),
  facebook_link: z.lazy(() => SortOrderSchema).optional(),
  instagram_link: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodayResinCountOrderByAggregateInputSchema: z.ZodType<Prisma.TodayResinCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodayResinAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TodayResinAvgOrderByAggregateInput> = z.object({
  quota: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodayResinMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TodayResinMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodayResinMinOrderByAggregateInputSchema: z.ZodType<Prisma.TodayResinMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  quota: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodayResinSumOrderByAggregateInputSchema: z.ZodType<Prisma.TodayResinSumOrderByAggregateInput> = z.object({
  quota: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const FactionsCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.FactionsCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => FactionsCreateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FactionsCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => FactionsWhereUniqueInputSchema).optional()
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnumPlayerTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPlayerTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PlayerTypeSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const FactionsUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.FactionsUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => FactionsCreateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FactionsCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => FactionsUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FactionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FactionsUpdateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutQRInstancesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutQRInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateNestedManyWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedManyWithoutScannedQrsInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema).array(),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUncheckedCreateNestedManyWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateNestedManyWithoutScannedQrsInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema).array(),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutQRInstancesInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutQRInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutQRInstancesInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsUpdateManyWithoutScannedQrsNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateManyWithoutScannedQrsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema).array(),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FreshmenDetailsUpsertWithWhereUniqueWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUpsertWithWhereUniqueWithoutScannedQrsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithWhereUniqueWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUpdateWithWhereUniqueWithoutScannedQrsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FreshmenDetailsUpdateManyWithWhereWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUpdateManyWithWhereWithoutScannedQrsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FreshmenDetailsScalarWhereInputSchema),z.lazy(() => FreshmenDetailsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUncheckedUpdateManyWithoutScannedQrsNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateManyWithoutScannedQrsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema).array(),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FreshmenDetailsUpsertWithWhereUniqueWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUpsertWithWhereUniqueWithoutScannedQrsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithWhereUniqueWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUpdateWithWhereUniqueWithoutScannedQrsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FreshmenDetailsUpdateManyWithWhereWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUpdateManyWithWhereWithoutScannedQrsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FreshmenDetailsScalarWhereInputSchema),z.lazy(() => FreshmenDetailsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutPasscodeInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsUpdateOneWithoutUsedPasscodesNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneWithoutUsedPasscodesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutUsedPasscodesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutUsedPasscodesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutFactionInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutFactionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFactionInputSchema),z.lazy(() => UserCreateWithoutFactionInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema),z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyFactionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutFactionInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutFactionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFactionInputSchema),z.lazy(() => UserCreateWithoutFactionInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema),z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyFactionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutFactionNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutFactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFactionInputSchema),z.lazy(() => UserCreateWithoutFactionInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema),z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutFactionInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutFactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyFactionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutFactionInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutFactionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutFactionInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutFactionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutFactionNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutFactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFactionInputSchema),z.lazy(() => UserCreateWithoutFactionInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema),z.lazy(() => UserCreateOrConnectWithoutFactionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutFactionInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutFactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyFactionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutFactionInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutFactionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutFactionInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutFactionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HintsCreateNestedOneWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsCreateNestedOneWithoutRevealedHintInstancesInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutRevealedHintInstancesInputSchema),z.lazy(() => HintsUncheckedCreateWithoutRevealedHintInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HintsCreateOrConnectWithoutRevealedHintInstancesInputSchema).optional(),
  connect: z.lazy(() => HintsWhereUniqueInputSchema).optional()
}).strict();

export const PairCreateNestedOneWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairCreateNestedOneWithoutRevealedHintsInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutRevealedHintsInputSchema),z.lazy(() => PairUncheckedCreateWithoutRevealedHintsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PairCreateOrConnectWithoutRevealedHintsInputSchema).optional(),
  connect: z.lazy(() => PairWhereUniqueInputSchema).optional()
}).strict();

export const HintsUpdateOneRequiredWithoutRevealedHintInstancesNestedInputSchema: z.ZodType<Prisma.HintsUpdateOneRequiredWithoutRevealedHintInstancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutRevealedHintInstancesInputSchema),z.lazy(() => HintsUncheckedCreateWithoutRevealedHintInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HintsCreateOrConnectWithoutRevealedHintInstancesInputSchema).optional(),
  upsert: z.lazy(() => HintsUpsertWithoutRevealedHintInstancesInputSchema).optional(),
  connect: z.lazy(() => HintsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HintsUpdateWithoutRevealedHintInstancesInputSchema),z.lazy(() => HintsUncheckedUpdateWithoutRevealedHintInstancesInputSchema) ]).optional(),
}).strict();

export const PairUpdateOneRequiredWithoutRevealedHintsNestedInputSchema: z.ZodType<Prisma.PairUpdateOneRequiredWithoutRevealedHintsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutRevealedHintsInputSchema),z.lazy(() => PairUncheckedCreateWithoutRevealedHintsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PairCreateOrConnectWithoutRevealedHintsInputSchema).optional(),
  upsert: z.lazy(() => PairUpsertWithoutRevealedHintsInputSchema).optional(),
  connect: z.lazy(() => PairWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PairUpdateWithoutRevealedHintsInputSchema),z.lazy(() => PairUncheckedUpdateWithoutRevealedHintsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutPairInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutPairInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutPairInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutPairInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutPairInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPairInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPairInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutPairInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const RevealedHintInstancesCreateNestedManyWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateNestedManyWithoutPairInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyPairInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedCreateNestedManyWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedCreateNestedManyWithoutPairInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyPairInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUpdateOneRequiredWithoutPairNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneRequiredWithoutPairNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutPairInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutPairInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutPairInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutPairInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutPairInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutPairInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutPairNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutPairNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPairInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPairInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutPairInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutPairInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutPairInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutPairInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesUpdateManyWithoutPairNestedInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateManyWithoutPairNestedInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutPairInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyPairInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutPairInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutPairInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedUpdateManyWithoutPairNestedInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateManyWithoutPairNestedInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutPairInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutPairInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyPairInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutPairInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutPairInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsCreatethisOrThatInputSchema: z.ZodType<Prisma.FreshmenDetailsCreatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array()
}).strict();

export const UserCreateNestedOneWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFreshmenDetailsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreshmenDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateNestedManyWithoutUsedByInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyUsedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesCreateNestedManyWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesCreateNestedManyWithoutScannedByInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PairCreateNestedOneWithoutFreshmenInputSchema: z.ZodType<Prisma.PairCreateNestedOneWithoutFreshmenInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedCreateWithoutFreshmenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PairCreateOrConnectWithoutFreshmenInputSchema).optional(),
  connect: z.lazy(() => PairWhereUniqueInputSchema).optional()
}).strict();

export const TodayResinCreateNestedManyWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinCreateNestedManyWithoutFreshmenInput> = z.object({
  create: z.union([ z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema).array(),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TodayResinCreateManyFreshmenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseCreateNestedManyWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateNestedManyWithoutFreshInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManyFreshInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastCreateNestedManyWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastCreateNestedManyWithoutCasterInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyCasterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyUsedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateNestedManyWithoutScannedByInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PairUncheckedCreateNestedOneWithoutFreshmenInputSchema: z.ZodType<Prisma.PairUncheckedCreateNestedOneWithoutFreshmenInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedCreateWithoutFreshmenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PairCreateOrConnectWithoutFreshmenInputSchema).optional(),
  connect: z.lazy(() => PairWhereUniqueInputSchema).optional()
}).strict();

export const TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUncheckedCreateNestedManyWithoutFreshmenInput> = z.object({
  create: z.union([ z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema).array(),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TodayResinCreateManyFreshmenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManyFreshInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateNestedManyWithoutCasterInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyCasterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUpdatethisOrThatInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array().optional(),
  push: z.union([ z.lazy(() => ThisOrThatSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const EnumNameTitleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNameTitleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NameTitleSchema).optional()
}).strict();

export const EnumBranchFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBranchFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BranchSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFreshmenDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreshmenDetailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFreshmenDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFreshmenDetailsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyWithoutUsedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutUsedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyUsedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutUsedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutUsedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasscodeInstancesScalarWhereInputSchema),z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesUpdateManyWithoutScannedByNestedInputSchema: z.ZodType<Prisma.QRInstancesUpdateManyWithoutScannedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutScannedByInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PairUpdateOneWithoutFreshmenNestedInputSchema: z.ZodType<Prisma.PairUpdateOneWithoutFreshmenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedCreateWithoutFreshmenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PairCreateOrConnectWithoutFreshmenInputSchema).optional(),
  upsert: z.lazy(() => PairUpsertWithoutFreshmenInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PairWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PairUpdateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedUpdateWithoutFreshmenInputSchema) ]).optional(),
}).strict();

export const TodayResinUpdateManyWithoutFreshmenNestedInputSchema: z.ZodType<Prisma.TodayResinUpdateManyWithoutFreshmenNestedInput> = z.object({
  create: z.union([ z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema).array(),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TodayResinUpsertWithWhereUniqueWithoutFreshmenInputSchema),z.lazy(() => TodayResinUpsertWithWhereUniqueWithoutFreshmenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TodayResinCreateManyFreshmenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TodayResinUpdateWithWhereUniqueWithoutFreshmenInputSchema),z.lazy(() => TodayResinUpdateWithWhereUniqueWithoutFreshmenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TodayResinUpdateManyWithWhereWithoutFreshmenInputSchema),z.lazy(() => TodayResinUpdateManyWithWhereWithoutFreshmenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TodayResinScalarWhereInputSchema),z.lazy(() => TodayResinScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyWithoutFreshNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutFreshInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManyFreshInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutFreshInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutFreshInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUpdateManyWithoutCasterNestedInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyWithoutCasterNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutCasterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyCasterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutCasterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutCasterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutUsedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyUsedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutUsedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutUsedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasscodeInstancesScalarWhereInputSchema),z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyWithoutScannedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutScannedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutScannedByInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema: z.ZodType<Prisma.PairUncheckedUpdateOneWithoutFreshmenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedCreateWithoutFreshmenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PairCreateOrConnectWithoutFreshmenInputSchema).optional(),
  upsert: z.lazy(() => PairUpsertWithoutFreshmenInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PairWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PairUpdateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedUpdateWithoutFreshmenInputSchema) ]).optional(),
}).strict();

export const TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema: z.ZodType<Prisma.TodayResinUncheckedUpdateManyWithoutFreshmenNestedInput> = z.object({
  create: z.union([ z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema).array(),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema),z.lazy(() => TodayResinCreateOrConnectWithoutFreshmenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TodayResinUpsertWithWhereUniqueWithoutFreshmenInputSchema),z.lazy(() => TodayResinUpsertWithWhereUniqueWithoutFreshmenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TodayResinCreateManyFreshmenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TodayResinWhereUniqueInputSchema),z.lazy(() => TodayResinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TodayResinUpdateWithWhereUniqueWithoutFreshmenInputSchema),z.lazy(() => TodayResinUpdateWithWhereUniqueWithoutFreshmenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TodayResinUpdateManyWithWhereWithoutFreshmenInputSchema),z.lazy(() => TodayResinUpdateManyWithWhereWithoutFreshmenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TodayResinScalarWhereInputSchema),z.lazy(() => TodayResinScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutFreshInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutFreshInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManyFreshInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutFreshInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutFreshInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutCasterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutCasterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyCasterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutCasterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutCasterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HintsCreateNestedManyWithoutSlugInputSchema: z.ZodType<Prisma.HintsCreateNestedManyWithoutSlugInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSlugInputSchema),z.lazy(() => HintsCreateWithoutSlugInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySlugInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HintsUncheckedCreateNestedManyWithoutSlugInputSchema: z.ZodType<Prisma.HintsUncheckedCreateNestedManyWithoutSlugInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSlugInputSchema),z.lazy(() => HintsCreateWithoutSlugInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySlugInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HintsUpdateManyWithoutSlugNestedInputSchema: z.ZodType<Prisma.HintsUpdateManyWithoutSlugNestedInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSlugInputSchema),z.lazy(() => HintsCreateWithoutSlugInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HintsUpsertWithWhereUniqueWithoutSlugInputSchema),z.lazy(() => HintsUpsertWithWhereUniqueWithoutSlugInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySlugInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HintsUpdateWithWhereUniqueWithoutSlugInputSchema),z.lazy(() => HintsUpdateWithWhereUniqueWithoutSlugInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HintsUpdateManyWithWhereWithoutSlugInputSchema),z.lazy(() => HintsUpdateManyWithWhereWithoutSlugInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HintsScalarWhereInputSchema),z.lazy(() => HintsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HintsUncheckedUpdateManyWithoutSlugNestedInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateManyWithoutSlugNestedInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSlugInputSchema),z.lazy(() => HintsCreateWithoutSlugInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSlugInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HintsUpsertWithWhereUniqueWithoutSlugInputSchema),z.lazy(() => HintsUpsertWithWhereUniqueWithoutSlugInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySlugInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HintsUpdateWithWhereUniqueWithoutSlugInputSchema),z.lazy(() => HintsUpdateWithWhereUniqueWithoutSlugInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HintsUpdateManyWithWhereWithoutSlugInputSchema),z.lazy(() => HintsUpdateManyWithWhereWithoutSlugInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HintsScalarWhereInputSchema),z.lazy(() => HintsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HintSlugsCreateNestedOneWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsCreateNestedOneWithoutHintsInput> = z.object({
  create: z.union([ z.lazy(() => HintSlugsCreateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedCreateWithoutHintsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HintSlugsCreateOrConnectWithoutHintsInputSchema).optional(),
  connect: z.lazy(() => HintSlugsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutHintsInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutHintsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutHintsInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const RevealedHintInstancesCreateNestedManyWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateNestedManyWithoutHintInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyHintInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedCreateNestedManyWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedCreateNestedManyWithoutHintInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyHintInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HintSlugsUpdateOneRequiredWithoutHintsNestedInputSchema: z.ZodType<Prisma.HintSlugsUpdateOneRequiredWithoutHintsNestedInput> = z.object({
  create: z.union([ z.lazy(() => HintSlugsCreateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedCreateWithoutHintsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HintSlugsCreateOrConnectWithoutHintsInputSchema).optional(),
  upsert: z.lazy(() => HintSlugsUpsertWithoutHintsInputSchema).optional(),
  connect: z.lazy(() => HintSlugsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HintSlugsUpdateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedUpdateWithoutHintsInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutHintsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutHintsInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutHintsInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutHintsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesUpdateManyWithoutHintNestedInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateManyWithoutHintNestedInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutHintInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyHintInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutHintInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutHintInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedUpdateManyWithoutHintNestedInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateManyWithoutHintNestedInput> = z.object({
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema).array(),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesCreateOrConnectWithoutHintInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUpsertWithWhereUniqueWithoutHintInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RevealedHintInstancesCreateManyHintInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUpdateWithWhereUniqueWithoutHintInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUpdateManyWithWhereWithoutHintInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutMagicIdInstancesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicIdInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicIdInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutMagicIdInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutMagicIdInstancesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutMagicIdInstancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicIdInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicIdInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutMagicIdInstancesInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutMagicIdInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutMagicIdInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutMagicIdInstancesInputSchema) ]).optional(),
}).strict();

export const MagicVersesCreateNestedManyWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesCreateNestedManyWithoutStartersInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateWithoutStartersInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutStarterMagicVerseInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutStarterMagicVerseInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutStarterMagicVerseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutStarterMagicVerseInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutStarterVersesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutStarterVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutStarterVersesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutStarterVersesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const MagicVersesUncheckedCreateNestedManyWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateNestedManyWithoutStartersInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateWithoutStartersInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesUpdateManyWithoutStartersNestedInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyWithoutStartersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateWithoutStartersInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutStartersInputSchema),z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutStartersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutStartersInputSchema),z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutStartersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVersesUpdateManyWithWhereWithoutStartersInputSchema),z.lazy(() => MagicVersesUpdateManyWithWhereWithoutStartersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUpdateOneRequiredWithoutStarterMagicVerseNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneRequiredWithoutStarterMagicVerseNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutStarterMagicVerseInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutStarterMagicVerseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutStarterMagicVerseInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutStarterMagicVerseInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutStarterMagicVerseInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutStarterMagicVerseInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutStarterVersesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutStarterVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutStarterVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutStarterVersesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutStarterVersesInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutStarterVersesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutStarterVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutStarterVersesInputSchema) ]).optional(),
}).strict();

export const MagicVersesUncheckedUpdateManyWithoutStartersNestedInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateManyWithoutStartersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateWithoutStartersInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutStartersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutStartersInputSchema),z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutStartersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutStartersInputSchema),z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutStartersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVersesUpdateManyWithWhereWithoutStartersInputSchema),z.lazy(() => MagicVersesUpdateManyWithWhereWithoutStartersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastCreateresultInputSchema: z.ZodType<Prisma.MagicVerseCastCreateresultInput> = z.object({
  set: z.boolean().array()
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutMagicVerseCastInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutMagicVerseCastInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutMagicVerseCastInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutMagicVerseCastInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutMagicVersesCastedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicVersesCastedInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicVersesCastedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutMagicVersesCastedInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const MagicVersesCreateNestedManyWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesCreateNestedManyWithoutCastsInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateWithoutCastsInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesUncheckedCreateNestedManyWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateNestedManyWithoutCastsInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateWithoutCastsInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUpdateresultInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateresultInput> = z.object({
  set: z.boolean().array().optional(),
  push: z.union([ z.boolean(),z.boolean().array() ]).optional(),
}).strict();

export const FreshmenDetailsUpdateOneRequiredWithoutMagicVerseCastNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneRequiredWithoutMagicVerseCastNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutMagicVerseCastInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutMagicVerseCastInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutMagicVerseCastInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutMagicVerseCastInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutMagicVerseCastInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutMagicVerseCastInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutMagicVersesCastedNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutMagicVersesCastedNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicVersesCastedInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicVersesCastedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutMagicVersesCastedInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutMagicVersesCastedInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutMagicVersesCastedInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutMagicVersesCastedInputSchema) ]).optional(),
}).strict();

export const MagicVersesUpdateManyWithoutCastsNestedInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyWithoutCastsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateWithoutCastsInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutCastsInputSchema),z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutCastsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutCastsInputSchema),z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutCastsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVersesUpdateManyWithWhereWithoutCastsInputSchema),z.lazy(() => MagicVersesUpdateManyWithWhereWithoutCastsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesUncheckedUpdateManyWithoutCastsNestedInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateManyWithoutCastsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateWithoutCastsInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutCastsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutCastsInputSchema),z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutCastsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutCastsInputSchema),z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutCastsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVersesUpdateManyWithWhereWithoutCastsInputSchema),z.lazy(() => MagicVersesUpdateManyWithWhereWithoutCastsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastCreateNestedManyWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastCreateNestedManyWithoutVersesInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsCreateNestedManyWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedManyWithoutVersesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema).array(),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseCreateNestedManyWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateNestedManyWithoutVersesInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedCreateNestedManyWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateNestedManyWithoutVersesInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUncheckedCreateNestedManyWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateNestedManyWithoutVersesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema).array(),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedCreateNestedManyWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateNestedManyWithoutVersesInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MagicVerseCastUpdateManyWithoutVersesNestedInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyWithoutVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutVersesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUpdateManyWithoutVersesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateManyWithoutVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema).array(),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SophomoreDetailsUpsertWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUpsertWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUpdateWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SophomoreDetailsUpdateManyWithWhereWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUpdateManyWithWhereWithoutVersesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SophomoreDetailsScalarWhereInputSchema),z.lazy(() => SophomoreDetailsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUpdateManyWithoutVersesNestedInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyWithoutVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutVersesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedUpdateManyWithoutVersesNestedInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyWithoutVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutVersesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUncheckedUpdateManyWithoutVersesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateManyWithoutVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema).array(),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SophomoreDetailsUpsertWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUpsertWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUpdateWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SophomoreDetailsUpdateManyWithWhereWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUpdateManyWithWhereWithoutVersesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SophomoreDetailsScalarWhereInputSchema),z.lazy(() => SophomoreDetailsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedUpdateManyWithoutVersesNestedInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyWithoutVersesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutVersesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutVersesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutVersesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsCreatethisOrThatInputSchema: z.ZodType<Prisma.SophomoreDetailsCreatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array()
}).strict();

export const HintsCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsCreateWithoutSophomoreInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QRInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSophomoreDetailsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSophomoreDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PairCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.PairCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutSophomoreInputSchema),z.lazy(() => PairCreateWithoutSophomoreInputSchema).array(),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PairCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesCreateNestedManyWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesCreateNestedManyWithoutSophomoresInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema).array(),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastCreateNestedManyWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastCreateNestedManyWithoutTargetInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyTargetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUncheckedCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsCreateWithoutSophomoreInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QRInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PairUncheckedCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUncheckedCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutSophomoreInputSchema),z.lazy(() => PairCreateWithoutSophomoreInputSchema).array(),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PairCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateNestedManyWithoutSophomoresInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema).array(),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateNestedManyWithoutTargetInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyTargetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUpdatethisOrThatInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array().optional(),
  push: z.union([ z.lazy(() => ThisOrThatSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
}).strict();

export const HintsUpdateManyWithoutSophomoreNestedInputSchema: z.ZodType<Prisma.HintsUpdateManyWithoutSophomoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsCreateWithoutSophomoreInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HintsUpsertWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => HintsUpsertWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySophomoreInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HintsUpdateWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => HintsUpdateWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HintsUpdateManyWithWhereWithoutSophomoreInputSchema),z.lazy(() => HintsUpdateManyWithWhereWithoutSophomoreInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HintsScalarWhereInputSchema),z.lazy(() => HintsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasscodeInstancesScalarWhereInputSchema),z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.QRInstancesUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QRInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QRInstancesUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => QRInstancesUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSophomoreDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSophomoreDetailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSophomoreDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSophomoreDetailsInputSchema) ]).optional(),
}).strict();

export const PairUpdateManyWithoutSophomoreNestedInputSchema: z.ZodType<Prisma.PairUpdateManyWithoutSophomoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutSophomoreInputSchema),z.lazy(() => PairCreateWithoutSophomoreInputSchema).array(),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PairUpsertWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => PairUpsertWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PairCreateManySophomoreInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PairUpdateWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => PairUpdateWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PairUpdateManyWithWhereWithoutSophomoreInputSchema),z.lazy(() => PairUpdateManyWithWhereWithoutSophomoreInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PairScalarWhereInputSchema),z.lazy(() => PairScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesUpdateManyWithoutSophomoresNestedInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyWithoutSophomoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutSophomoresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutSophomoresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVersesUpdateManyWithWhereWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUpdateManyWithWhereWithoutSophomoresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema).array(),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpsertWithWhereUniqueWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUpsertWithWhereUniqueWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateWithWhereUniqueWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUpdateWithWhereUniqueWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithWhereWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithWhereWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema),z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyWithoutSophomoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManySophomoreInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutSophomoreInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUpdateManyWithoutTargetNestedInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyWithoutTargetNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyTargetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutTargetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateManyWithoutSophomoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsCreateWithoutSophomoreInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HintsUpsertWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => HintsUpsertWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySophomoreInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HintsUpdateWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => HintsUpdateWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HintsUpdateManyWithWhereWithoutSophomoreInputSchema),z.lazy(() => HintsUpdateManyWithWhereWithoutSophomoreInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HintsScalarWhereInputSchema),z.lazy(() => HintsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasscodeInstancesScalarWhereInputSchema),z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => QRInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QRInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QRInstancesUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => QRInstancesUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema: z.ZodType<Prisma.PairUncheckedUpdateManyWithoutSophomoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => PairCreateWithoutSophomoreInputSchema),z.lazy(() => PairCreateWithoutSophomoreInputSchema).array(),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => PairCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PairUpsertWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => PairUpsertWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PairCreateManySophomoreInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PairWhereUniqueInputSchema),z.lazy(() => PairWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PairUpdateWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => PairUpdateWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PairUpdateManyWithWhereWithoutSophomoreInputSchema),z.lazy(() => PairUpdateManyWithWhereWithoutSophomoreInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PairScalarWhereInputSchema),z.lazy(() => PairScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema).array(),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema),z.lazy(() => MagicVersesCreateOrConnectWithoutSophomoresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUpsertWithWhereUniqueWithoutSophomoresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVersesWhereUniqueInputSchema),z.lazy(() => MagicVersesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUpdateWithWhereUniqueWithoutSophomoresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVersesUpdateManyWithWhereWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUpdateManyWithWhereWithoutSophomoresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema).array(),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpsertWithWhereUniqueWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUpsertWithWhereUniqueWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateWithWhereUniqueWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUpdateWithWhereUniqueWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithWhereWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithWhereWithoutSophomoreDetailsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema),z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema).array(),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUpsertWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarterMagicVerseCreateManySophomoreInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),z.lazy(() => StarterMagicVerseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUpdateWithWhereUniqueWithoutSophomoreInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUpdateManyWithWhereWithoutSophomoreInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInput> = z.object({
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema).array(),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema),z.lazy(() => MagicVerseCastCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUpsertWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicVerseCastCreateManyTargetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicVerseCastWhereUniqueInputSchema),z.lazy(() => MagicVerseCastWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUpdateWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUpdateManyWithWhereWithoutTargetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutTodayResinInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutTodayResinInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutTodayResinInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutTodayResinInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const FreshmenDetailsUpdateOneRequiredWithoutTodayResinNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneRequiredWithoutTodayResinNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutTodayResinInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutTodayResinInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutTodayResinInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutTodayResinInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutTodayResinInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutTodayResinInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumPlayerTypeFilterSchema: z.ZodType<Prisma.NestedEnumPlayerTypeFilter> = z.object({
  equals: z.lazy(() => PlayerTypeSchema).optional(),
  in: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => NestedEnumPlayerTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumPlayerTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPlayerTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlayerTypeSchema).optional(),
  in: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PlayerTypeSchema).array(),z.lazy(() => PlayerTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => NestedEnumPlayerTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlayerTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlayerTypeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumNameTitleFilterSchema: z.ZodType<Prisma.NestedEnumNameTitleFilter> = z.object({
  equals: z.lazy(() => NameTitleSchema).optional(),
  in: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  not: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => NestedEnumNameTitleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBranchFilterSchema: z.ZodType<Prisma.NestedEnumBranchFilter> = z.object({
  equals: z.lazy(() => BranchSchema).optional(),
  in: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  not: z.union([ z.lazy(() => BranchSchema),z.lazy(() => NestedEnumBranchFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumNameTitleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNameTitleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NameTitleSchema).optional(),
  in: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => NameTitleSchema).array(),z.lazy(() => NameTitleSchema) ]).optional(),
  not: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => NestedEnumNameTitleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNameTitleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNameTitleFilterSchema).optional()
}).strict();

export const NestedEnumBranchWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBranchWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BranchSchema).optional(),
  in: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => BranchSchema).array(),z.lazy(() => BranchSchema) ]).optional(),
  not: z.union([ z.lazy(() => BranchSchema),z.lazy(() => NestedEnumBranchWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBranchFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBranchFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  faction: z.lazy(() => FactionsCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  faction: z.lazy(() => FactionsUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  faction: z.lazy(() => FactionsCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  faction: z.lazy(() => FactionsUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FreshmenDetailsCreateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutUserInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutUserInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SophomoreDetailsCreateWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutUserInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutUserInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FactionsCreateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const FactionsUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const FactionsCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.FactionsCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => FactionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FactionsCreateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FreshmenDetailsUpsertWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutUserInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutUserInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SophomoreDetailsUpsertWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutUserInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutUserInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const FactionsUpsertWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => FactionsUpdateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => FactionsCreateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const FactionsUpdateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FactionsUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsCreateWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutQRInstancesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutQRInstancesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutQRInstancesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]),
}).strict();

export const FreshmenDetailsCreateWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutScannedQrsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutScannedQrsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutScannedQrsInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema) ]),
}).strict();

export const SophomoreDetailsUpsertWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutQRInstancesInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutQRInstancesInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutQRInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutQRInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUpsertWithWhereUniqueWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithWhereUniqueWithoutScannedQrsInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutScannedQrsInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQrsInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithWhereUniqueWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithWhereUniqueWithoutScannedQrsInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutScannedQrsInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutScannedQrsInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateManyWithWhereWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateManyWithWhereWithoutScannedQrsInput> = z.object({
  where: z.lazy(() => FreshmenDetailsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FreshmenDetailsUpdateManyMutationInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateManyWithoutScannedByInputSchema) ]),
}).strict();

export const FreshmenDetailsScalarWhereInputSchema: z.ZodType<Prisma.FreshmenDetailsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FreshmenDetailsScalarWhereInputSchema),z.lazy(() => FreshmenDetailsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FreshmenDetailsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FreshmenDetailsScalarWhereInputSchema),z.lazy(() => FreshmenDetailsScalarWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  student_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passcodePoints: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  easterEgg: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  vip: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutPasscodeInstancesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]),
}).strict();

export const FreshmenDetailsCreateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutUsedPasscodesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpsertWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutPasscodeInstancesInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutPasscodeInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUpsertWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutUsedPasscodesInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutUsedPasscodesInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutUsedPasscodesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutUsedPasscodesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFactionInputSchema: z.ZodType<Prisma.UserCreateWithoutFactionInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFactionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFactionInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFactionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFactionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema) ]),
}).strict();

export const UserCreateManyFactionInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyFactionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyFactionInputSchema),z.lazy(() => UserCreateManyFactionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutFactionInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutFactionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutFactionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFactionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutFactionInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutFactionInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutFactionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutFactionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFactionInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutFactionInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutFactionInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumPlayerTypeFilterSchema),z.lazy(() => PlayerTypeSchema) ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  factionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const HintsCreateWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsCreateWithoutRevealedHintInstancesInput> = z.object({
  content: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  slug: z.lazy(() => HintSlugsCreateNestedOneWithoutHintsInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutHintsInputSchema)
}).strict();

export const HintsUncheckedCreateWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsUncheckedCreateWithoutRevealedHintInstancesInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const HintsCreateOrConnectWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsCreateOrConnectWithoutRevealedHintInstancesInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HintsCreateWithoutRevealedHintInstancesInputSchema),z.lazy(() => HintsUncheckedCreateWithoutRevealedHintInstancesInputSchema) ]),
}).strict();

export const PairCreateWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairCreateWithoutRevealedHintsInput> = z.object({
  id: z.string().cuid().optional(),
  freshmen: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutPairInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPairInputSchema)
}).strict();

export const PairUncheckedCreateWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairUncheckedCreateWithoutRevealedHintsInput> = z.object({
  id: z.string().cuid().optional(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string()
}).strict();

export const PairCreateOrConnectWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairCreateOrConnectWithoutRevealedHintsInput> = z.object({
  where: z.lazy(() => PairWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PairCreateWithoutRevealedHintsInputSchema),z.lazy(() => PairUncheckedCreateWithoutRevealedHintsInputSchema) ]),
}).strict();

export const HintsUpsertWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsUpsertWithoutRevealedHintInstancesInput> = z.object({
  update: z.union([ z.lazy(() => HintsUpdateWithoutRevealedHintInstancesInputSchema),z.lazy(() => HintsUncheckedUpdateWithoutRevealedHintInstancesInputSchema) ]),
  create: z.union([ z.lazy(() => HintsCreateWithoutRevealedHintInstancesInputSchema),z.lazy(() => HintsUncheckedCreateWithoutRevealedHintInstancesInputSchema) ]),
}).strict();

export const HintsUpdateWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsUpdateWithoutRevealedHintInstancesInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.lazy(() => HintSlugsUpdateOneRequiredWithoutHintsNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateWithoutRevealedHintInstancesInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PairUpsertWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairUpsertWithoutRevealedHintsInput> = z.object({
  update: z.union([ z.lazy(() => PairUpdateWithoutRevealedHintsInputSchema),z.lazy(() => PairUncheckedUpdateWithoutRevealedHintsInputSchema) ]),
  create: z.union([ z.lazy(() => PairCreateWithoutRevealedHintsInputSchema),z.lazy(() => PairUncheckedCreateWithoutRevealedHintsInputSchema) ]),
}).strict();

export const PairUpdateWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairUpdateWithoutRevealedHintsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmen: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutPairNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPairNestedInputSchema).optional()
}).strict();

export const PairUncheckedUpdateWithoutRevealedHintsInputSchema: z.ZodType<Prisma.PairUncheckedUpdateWithoutRevealedHintsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsCreateWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutPairInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutPairInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutPairInputSchema) ]),
}).strict();

export const SophomoreDetailsCreateWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutPairInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPairInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPairInputSchema) ]),
}).strict();

export const RevealedHintInstancesCreateWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateWithoutPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  hint: z.lazy(() => HintsCreateNestedOneWithoutRevealedHintInstancesInputSchema)
}).strict();

export const RevealedHintInstancesUncheckedCreateWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedCreateWithoutPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  hintsHintSlugId: z.string(),
  hintsSophomoreId: z.string()
}).strict();

export const RevealedHintInstancesCreateOrConnectWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateOrConnectWithoutPairInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema) ]),
}).strict();

export const RevealedHintInstancesCreateManyPairInputEnvelopeSchema: z.ZodType<Prisma.RevealedHintInstancesCreateManyPairInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RevealedHintInstancesCreateManyPairInputSchema),z.lazy(() => RevealedHintInstancesCreateManyPairInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FreshmenDetailsUpsertWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutPairInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutPairInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutPairInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutPairInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutPairInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutPairInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutPairInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutPairInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUpsertWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutPairInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutPairInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutPairInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPairInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPairInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutPairInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutPairInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutPairInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const RevealedHintInstancesUpsertWithWhereUniqueWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpsertWithWhereUniqueWithoutPairInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedUpdateWithoutPairInputSchema) ]),
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutPairInputSchema) ]),
}).strict();

export const RevealedHintInstancesUpdateWithWhereUniqueWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateWithWhereUniqueWithoutPairInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithoutPairInputSchema),z.lazy(() => RevealedHintInstancesUncheckedUpdateWithoutPairInputSchema) ]),
}).strict();

export const RevealedHintInstancesUpdateManyWithWhereWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateManyWithWhereWithoutPairInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RevealedHintInstancesUpdateManyMutationInputSchema),z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutRevealedHintsInputSchema) ]),
}).strict();

export const RevealedHintInstancesScalarWhereInputSchema: z.ZodType<Prisma.RevealedHintInstancesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),z.lazy(() => RevealedHintInstancesScalarWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hintsHintSlugId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hintsSophomoreId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pairId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserCreateWithoutFreshmenDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  faction: z.lazy(() => FactionsCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFreshmenDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFreshmenDetailsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]),
}).strict();

export const PasscodeInstancesCreateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateWithoutUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  content: z.string(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInputSchema)
}).strict();

export const PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateWithoutUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string(),
  content: z.string()
}).strict();

export const PasscodeInstancesCreateOrConnectWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateOrConnectWithoutUsedByInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema) ]),
}).strict();

export const PasscodeInstancesCreateManyUsedByInputEnvelopeSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyUsedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PasscodeInstancesCreateManyUsedByInputSchema),z.lazy(() => PasscodeInstancesCreateManyUsedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QRInstancesCreateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesCreateWithoutScannedByInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  secret: z.string(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutQRInstancesInputSchema)
}).strict();

export const QRInstancesUncheckedCreateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateWithoutScannedByInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string(),
  quota: z.number().int().optional(),
  secret: z.string()
}).strict();

export const QRInstancesCreateOrConnectWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesCreateOrConnectWithoutScannedByInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema) ]),
}).strict();

export const PairCreateWithoutFreshmenInputSchema: z.ZodType<Prisma.PairCreateWithoutFreshmenInput> = z.object({
  id: z.string().cuid().optional(),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPairInputSchema),
  revealedHints: z.lazy(() => RevealedHintInstancesCreateNestedManyWithoutPairInputSchema).optional()
}).strict();

export const PairUncheckedCreateWithoutFreshmenInputSchema: z.ZodType<Prisma.PairUncheckedCreateWithoutFreshmenInput> = z.object({
  id: z.string().cuid().optional(),
  sophomoreDetailsId: z.string(),
  revealedHints: z.lazy(() => RevealedHintInstancesUncheckedCreateNestedManyWithoutPairInputSchema).optional()
}).strict();

export const PairCreateOrConnectWithoutFreshmenInputSchema: z.ZodType<Prisma.PairCreateOrConnectWithoutFreshmenInput> = z.object({
  where: z.lazy(() => PairWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PairCreateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedCreateWithoutFreshmenInputSchema) ]),
}).strict();

export const TodayResinCreateWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinCreateWithoutFreshmenInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  quota: z.number().int().optional()
}).strict();

export const TodayResinUncheckedCreateWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUncheckedCreateWithoutFreshmenInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  quota: z.number().int().optional()
}).strict();

export const TodayResinCreateOrConnectWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinCreateOrConnectWithoutFreshmenInput> = z.object({
  where: z.lazy(() => TodayResinWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema) ]),
}).strict();

export const TodayResinCreateManyFreshmenInputEnvelopeSchema: z.ZodType<Prisma.TodayResinCreateManyFreshmenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TodayResinCreateManyFreshmenInputSchema),z.lazy(() => TodayResinCreateManyFreshmenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StarterMagicVerseCreateWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateWithoutFreshInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutStartersInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutStarterVersesInputSchema)
}).strict();

export const StarterMagicVerseUncheckedCreateWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateWithoutFreshInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  sophomoreDetailsId: z.string(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutStartersInputSchema).optional()
}).strict();

export const StarterMagicVerseCreateOrConnectWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateOrConnectWithoutFreshInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema) ]),
}).strict();

export const StarterMagicVerseCreateManyFreshInputEnvelopeSchema: z.ZodType<Prisma.StarterMagicVerseCreateManyFreshInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StarterMagicVerseCreateManyFreshInputSchema),z.lazy(() => StarterMagicVerseCreateManyFreshInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MagicVerseCastCreateWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastCreateWithoutCasterInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  target: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutMagicVersesCastedInputSchema),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutCastsInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedCreateWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateWithoutCasterInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  targetId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutCastsInputSchema).optional()
}).strict();

export const MagicVerseCastCreateOrConnectWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastCreateOrConnectWithoutCasterInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema) ]),
}).strict();

export const MagicVerseCastCreateManyCasterInputEnvelopeSchema: z.ZodType<Prisma.MagicVerseCastCreateManyCasterInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MagicVerseCastCreateManyCasterInputSchema),z.lazy(() => MagicVerseCastCreateManyCasterInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserUpsertWithoutFreshmenDetailsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFreshmenDetailsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]),
}).strict();

export const UserUpdateWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserUpdateWithoutFreshmenDetailsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  faction: z.lazy(() => FactionsUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFreshmenDetailsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUpsertWithWhereUniqueWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUpsertWithWhereUniqueWithoutUsedByInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PasscodeInstancesUpdateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedUpdateWithoutUsedByInputSchema) ]),
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema) ]),
}).strict();

export const PasscodeInstancesUpdateWithWhereUniqueWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateWithWhereUniqueWithoutUsedByInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PasscodeInstancesUpdateWithoutUsedByInputSchema),z.lazy(() => PasscodeInstancesUncheckedUpdateWithoutUsedByInputSchema) ]),
}).strict();

export const PasscodeInstancesUpdateManyWithWhereWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyWithWhereWithoutUsedByInput> = z.object({
  where: z.lazy(() => PasscodeInstancesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PasscodeInstancesUpdateManyMutationInputSchema),z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedPasscodesInputSchema) ]),
}).strict();

export const PasscodeInstancesScalarWhereInputSchema: z.ZodType<Prisma.PasscodeInstancesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasscodeInstancesScalarWhereInputSchema),z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasscodeInstancesScalarWhereInputSchema),z.lazy(() => PasscodeInstancesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  usedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const QRInstancesUpsertWithWhereUniqueWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUpsertWithWhereUniqueWithoutScannedByInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedUpdateWithoutScannedByInputSchema) ]),
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema) ]),
}).strict();

export const QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUpdateWithWhereUniqueWithoutScannedByInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QRInstancesUpdateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedUpdateWithoutScannedByInputSchema) ]),
}).strict();

export const QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUpdateManyWithWhereWithoutScannedByInput> = z.object({
  where: z.lazy(() => QRInstancesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QRInstancesUpdateManyMutationInputSchema),z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedQrsInputSchema) ]),
}).strict();

export const QRInstancesScalarWhereInputSchema: z.ZodType<Prisma.QRInstancesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QRInstancesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quota: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PairUpsertWithoutFreshmenInputSchema: z.ZodType<Prisma.PairUpsertWithoutFreshmenInput> = z.object({
  update: z.union([ z.lazy(() => PairUpdateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedUpdateWithoutFreshmenInputSchema) ]),
  create: z.union([ z.lazy(() => PairCreateWithoutFreshmenInputSchema),z.lazy(() => PairUncheckedCreateWithoutFreshmenInputSchema) ]),
}).strict();

export const PairUpdateWithoutFreshmenInputSchema: z.ZodType<Prisma.PairUpdateWithoutFreshmenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPairNestedInputSchema).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesUpdateManyWithoutPairNestedInputSchema).optional()
}).strict();

export const PairUncheckedUpdateWithoutFreshmenInputSchema: z.ZodType<Prisma.PairUncheckedUpdateWithoutFreshmenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutPairNestedInputSchema).optional()
}).strict();

export const TodayResinUpsertWithWhereUniqueWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUpsertWithWhereUniqueWithoutFreshmenInput> = z.object({
  where: z.lazy(() => TodayResinWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TodayResinUpdateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedUpdateWithoutFreshmenInputSchema) ]),
  create: z.union([ z.lazy(() => TodayResinCreateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedCreateWithoutFreshmenInputSchema) ]),
}).strict();

export const TodayResinUpdateWithWhereUniqueWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUpdateWithWhereUniqueWithoutFreshmenInput> = z.object({
  where: z.lazy(() => TodayResinWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TodayResinUpdateWithoutFreshmenInputSchema),z.lazy(() => TodayResinUncheckedUpdateWithoutFreshmenInputSchema) ]),
}).strict();

export const TodayResinUpdateManyWithWhereWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUpdateManyWithWhereWithoutFreshmenInput> = z.object({
  where: z.lazy(() => TodayResinScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TodayResinUpdateManyMutationInputSchema),z.lazy(() => TodayResinUncheckedUpdateManyWithoutTodayResinInputSchema) ]),
}).strict();

export const TodayResinScalarWhereInputSchema: z.ZodType<Prisma.TodayResinScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TodayResinScalarWhereInputSchema),z.lazy(() => TodayResinScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodayResinScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodayResinScalarWhereInputSchema),z.lazy(() => TodayResinScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quota: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const StarterMagicVerseUpsertWithWhereUniqueWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUpsertWithWhereUniqueWithoutFreshInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateWithoutFreshInputSchema) ]),
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutFreshInputSchema) ]),
}).strict();

export const StarterMagicVerseUpdateWithWhereUniqueWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateWithWhereUniqueWithoutFreshInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarterMagicVerseUpdateWithoutFreshInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateWithoutFreshInputSchema) ]),
}).strict();

export const StarterMagicVerseUpdateManyWithWhereWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyWithWhereWithoutFreshInput> = z.object({
  where: z.lazy(() => StarterMagicVerseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarterMagicVerseUpdateManyMutationInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutStarterMagicVerseInputSchema) ]),
}).strict();

export const StarterMagicVerseScalarWhereInputSchema: z.ZodType<Prisma.StarterMagicVerseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarterMagicVerseScalarWhereInputSchema),z.lazy(() => StarterMagicVerseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MagicVerseCastUpsertWithWhereUniqueWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUpsertWithWhereUniqueWithoutCasterInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateWithoutCasterInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutCasterInputSchema) ]),
}).strict();

export const MagicVerseCastUpdateWithWhereUniqueWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateWithWhereUniqueWithoutCasterInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVerseCastUpdateWithoutCasterInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateWithoutCasterInputSchema) ]),
}).strict();

export const MagicVerseCastUpdateManyWithWhereWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyWithWhereWithoutCasterInput> = z.object({
  where: z.lazy(() => MagicVerseCastScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVerseCastUpdateManyMutationInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutMagicVerseCastInputSchema) ]),
}).strict();

export const MagicVerseCastScalarWhereInputSchema: z.ZodType<Prisma.MagicVerseCastScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVerseCastScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVerseCastScalarWhereInputSchema),z.lazy(() => MagicVerseCastScalarWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  casterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  result: z.lazy(() => BoolNullableListFilterSchema).optional()
}).strict();

export const HintsCreateWithoutSlugInputSchema: z.ZodType<Prisma.HintsCreateWithoutSlugInput> = z.object({
  content: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutHintsInputSchema),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesCreateNestedManyWithoutHintInputSchema).optional()
}).strict();

export const HintsUncheckedCreateWithoutSlugInputSchema: z.ZodType<Prisma.HintsUncheckedCreateWithoutSlugInput> = z.object({
  content: z.string(),
  sophomoreId: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUncheckedCreateNestedManyWithoutHintInputSchema).optional()
}).strict();

export const HintsCreateOrConnectWithoutSlugInputSchema: z.ZodType<Prisma.HintsCreateOrConnectWithoutSlugInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HintsCreateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema) ]),
}).strict();

export const HintsCreateManySlugInputEnvelopeSchema: z.ZodType<Prisma.HintsCreateManySlugInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HintsCreateManySlugInputSchema),z.lazy(() => HintsCreateManySlugInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HintsUpsertWithWhereUniqueWithoutSlugInputSchema: z.ZodType<Prisma.HintsUpsertWithWhereUniqueWithoutSlugInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HintsUpdateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedUpdateWithoutSlugInputSchema) ]),
  create: z.union([ z.lazy(() => HintsCreateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSlugInputSchema) ]),
}).strict();

export const HintsUpdateWithWhereUniqueWithoutSlugInputSchema: z.ZodType<Prisma.HintsUpdateWithWhereUniqueWithoutSlugInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HintsUpdateWithoutSlugInputSchema),z.lazy(() => HintsUncheckedUpdateWithoutSlugInputSchema) ]),
}).strict();

export const HintsUpdateManyWithWhereWithoutSlugInputSchema: z.ZodType<Prisma.HintsUpdateManyWithWhereWithoutSlugInput> = z.object({
  where: z.lazy(() => HintsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HintsUpdateManyMutationInputSchema),z.lazy(() => HintsUncheckedUpdateManyWithoutHintsInputSchema) ]),
}).strict();

export const HintsScalarWhereInputSchema: z.ZodType<Prisma.HintsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HintsScalarWhereInputSchema),z.lazy(() => HintsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintsScalarWhereInputSchema),z.lazy(() => HintsScalarWhereInputSchema).array() ]).optional(),
  hintSlugId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  craete_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const HintSlugsCreateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsCreateWithoutHintsInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  index: z.number().int().optional().nullable()
}).strict();

export const HintSlugsUncheckedCreateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUncheckedCreateWithoutHintsInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  index: z.number().int().optional().nullable()
}).strict();

export const HintSlugsCreateOrConnectWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsCreateOrConnectWithoutHintsInput> = z.object({
  where: z.lazy(() => HintSlugsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HintSlugsCreateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedCreateWithoutHintsInputSchema) ]),
}).strict();

export const SophomoreDetailsCreateWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutHintsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutHintsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutHintsInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutHintsInputSchema) ]),
}).strict();

export const RevealedHintInstancesCreateWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateWithoutHintInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutRevealedHintsInputSchema)
}).strict();

export const RevealedHintInstancesUncheckedCreateWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedCreateWithoutHintInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  pairId: z.string()
}).strict();

export const RevealedHintInstancesCreateOrConnectWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateOrConnectWithoutHintInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema) ]),
}).strict();

export const RevealedHintInstancesCreateManyHintInputEnvelopeSchema: z.ZodType<Prisma.RevealedHintInstancesCreateManyHintInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RevealedHintInstancesCreateManyHintInputSchema),z.lazy(() => RevealedHintInstancesCreateManyHintInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HintSlugsUpsertWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUpsertWithoutHintsInput> = z.object({
  update: z.union([ z.lazy(() => HintSlugsUpdateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedUpdateWithoutHintsInputSchema) ]),
  create: z.union([ z.lazy(() => HintSlugsCreateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedCreateWithoutHintsInputSchema) ]),
}).strict();

export const HintSlugsUpdateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUpdateWithoutHintsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HintSlugsUncheckedUpdateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUncheckedUpdateWithoutHintsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SophomoreDetailsUpsertWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutHintsInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutHintsInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutHintsInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutHintsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutHintsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const RevealedHintInstancesUpsertWithWhereUniqueWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpsertWithWhereUniqueWithoutHintInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedUpdateWithoutHintInputSchema) ]),
  create: z.union([ z.lazy(() => RevealedHintInstancesCreateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedCreateWithoutHintInputSchema) ]),
}).strict();

export const RevealedHintInstancesUpdateWithWhereUniqueWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateWithWhereUniqueWithoutHintInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RevealedHintInstancesUpdateWithoutHintInputSchema),z.lazy(() => RevealedHintInstancesUncheckedUpdateWithoutHintInputSchema) ]),
}).strict();

export const RevealedHintInstancesUpdateManyWithWhereWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateManyWithWhereWithoutHintInput> = z.object({
  where: z.lazy(() => RevealedHintInstancesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RevealedHintInstancesUpdateManyMutationInputSchema),z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutRevealedHintInstancesInputSchema) ]),
}).strict();

export const SophomoreDetailsCreateWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutMagicIdInstancesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutMagicIdInstancesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutMagicIdInstancesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicIdInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicIdInstancesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpsertWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutMagicIdInstancesInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutMagicIdInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutMagicIdInstancesInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicIdInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicIdInstancesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutMagicIdInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutMagicIdInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const MagicVersesCreateWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesCreateWithoutStartersInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  casts: z.lazy(() => MagicVerseCastCreateNestedManyWithoutVersesInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesUncheckedCreateWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateWithoutStartersInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  casts: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutVersesInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUncheckedCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesCreateOrConnectWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesCreateOrConnectWithoutStartersInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema) ]),
}).strict();

export const FreshmenDetailsCreateWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutStarterMagicVerseInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutStarterMagicVerseInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutStarterMagicVerseInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutStarterMagicVerseInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutStarterMagicVerseInputSchema) ]),
}).strict();

export const SophomoreDetailsCreateWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutStarterVersesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutStarterVersesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutStarterVersesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutStarterVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutStarterVersesInputSchema) ]),
}).strict();

export const MagicVersesUpsertWithWhereUniqueWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUpsertWithWhereUniqueWithoutStartersInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedUpdateWithoutStartersInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutStartersInputSchema) ]),
}).strict();

export const MagicVersesUpdateWithWhereUniqueWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUpdateWithWhereUniqueWithoutStartersInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVersesUpdateWithoutStartersInputSchema),z.lazy(() => MagicVersesUncheckedUpdateWithoutStartersInputSchema) ]),
}).strict();

export const MagicVersesUpdateManyWithWhereWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyWithWhereWithoutStartersInput> = z.object({
  where: z.lazy(() => MagicVersesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVersesUpdateManyMutationInputSchema),z.lazy(() => MagicVersesUncheckedUpdateManyWithoutVersesInputSchema) ]),
}).strict();

export const MagicVersesScalarWhereInputSchema: z.ZodType<Prisma.MagicVersesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVersesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVersesScalarWhereInputSchema),z.lazy(() => MagicVersesScalarWhereInputSchema).array() ]).optional(),
  handler: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  wildcard: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  cost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const FreshmenDetailsUpsertWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutStarterMagicVerseInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutStarterMagicVerseInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutStarterMagicVerseInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutStarterMagicVerseInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutStarterMagicVerseInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutStarterMagicVerseInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutStarterMagicVerseInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUpsertWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutStarterVersesInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutStarterVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutStarterVersesInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutStarterVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutStarterVersesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutStarterVersesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutStarterVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutStarterVersesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutMagicVerseCastInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutMagicVerseCastInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedCreateNestedManyWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutMagicVerseCastInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutMagicVerseCastInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutMagicVerseCastInputSchema) ]),
}).strict();

export const SophomoreDetailsCreateWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutMagicVersesCastedInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutMagicVersesCastedInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutSophomoresInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutMagicVersesCastedInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicVersesCastedInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicVersesCastedInputSchema) ]),
}).strict();

export const MagicVersesCreateWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesCreateWithoutCastsInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  sophomores: z.lazy(() => SophomoreDetailsCreateNestedManyWithoutVersesInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesUncheckedCreateWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateWithoutCastsInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  sophomores: z.lazy(() => SophomoreDetailsUncheckedCreateNestedManyWithoutVersesInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesCreateOrConnectWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesCreateOrConnectWithoutCastsInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema) ]),
}).strict();

export const FreshmenDetailsUpsertWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutMagicVerseCastInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutMagicVerseCastInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutMagicVerseCastInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutMagicVerseCastInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutMagicVerseCastInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutMagicVerseCastInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutMagicVerseCastInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUpsertWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithoutMagicVersesCastedInput> = z.object({
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutMagicVersesCastedInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutMagicVersesCastedInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutMagicVersesCastedInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutMagicVersesCastedInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutMagicVersesCastedInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutMagicVersesCastedInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutSophomoresNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional()
}).strict();

export const MagicVersesUpsertWithWhereUniqueWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUpsertWithWhereUniqueWithoutCastsInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedUpdateWithoutCastsInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutCastsInputSchema) ]),
}).strict();

export const MagicVersesUpdateWithWhereUniqueWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUpdateWithWhereUniqueWithoutCastsInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVersesUpdateWithoutCastsInputSchema),z.lazy(() => MagicVersesUncheckedUpdateWithoutCastsInputSchema) ]),
}).strict();

export const MagicVersesUpdateManyWithWhereWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyWithWhereWithoutCastsInput> = z.object({
  where: z.lazy(() => MagicVersesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVersesUpdateManyMutationInputSchema),z.lazy(() => MagicVersesUncheckedUpdateManyWithoutVersesInputSchema) ]),
}).strict();

export const MagicVerseCastCreateWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastCreateWithoutVersesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  caster: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutMagicVerseCastInputSchema),
  target: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutMagicVersesCastedInputSchema)
}).strict();

export const MagicVerseCastUncheckedCreateWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateWithoutVersesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  casterId: z.string(),
  targetId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const MagicVerseCastCreateOrConnectWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastCreateOrConnectWithoutVersesInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema) ]),
}).strict();

export const SophomoreDetailsCreateWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateWithoutVersesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema),
  pair: z.lazy(() => PairCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutVersesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
  userId: z.string(),
  id: z.string().cuid().optional(),
  fullname: z.string(),
  title: z.lazy(() => NameTitleSchema),
  student_id: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateNestedManyWithoutSophomoreDetailsInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutVersesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema) ]),
}).strict();

export const StarterMagicVerseCreateWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateWithoutVersesInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  fresh: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutStarterMagicVerseInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutStarterVersesInputSchema)
}).strict();

export const StarterMagicVerseUncheckedCreateWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateWithoutVersesInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  freshmenDetailsId: z.string(),
  sophomoreDetailsId: z.string()
}).strict();

export const StarterMagicVerseCreateOrConnectWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateOrConnectWithoutVersesInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema) ]),
}).strict();

export const MagicVerseCastUpsertWithWhereUniqueWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUpsertWithWhereUniqueWithoutVersesInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateWithoutVersesInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutVersesInputSchema) ]),
}).strict();

export const MagicVerseCastUpdateWithWhereUniqueWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateWithWhereUniqueWithoutVersesInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVerseCastUpdateWithoutVersesInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateWithoutVersesInputSchema) ]),
}).strict();

export const MagicVerseCastUpdateManyWithWhereWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyWithWhereWithoutVersesInput> = z.object({
  where: z.lazy(() => MagicVerseCastScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVerseCastUpdateManyMutationInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCastsInputSchema) ]),
}).strict();

export const SophomoreDetailsUpsertWithWhereUniqueWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpsertWithWhereUniqueWithoutVersesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutVersesInputSchema) ]),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutVersesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateWithWhereUniqueWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithWhereUniqueWithoutVersesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutVersesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutVersesInputSchema) ]),
}).strict();

export const SophomoreDetailsUpdateManyWithWhereWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateManyWithWhereWithoutVersesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SophomoreDetailsUpdateManyMutationInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateManyWithoutSophomoresInputSchema) ]),
}).strict();

export const SophomoreDetailsScalarWhereInputSchema: z.ZodType<Prisma.SophomoreDetailsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SophomoreDetailsScalarWhereInputSchema),z.lazy(() => SophomoreDetailsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SophomoreDetailsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SophomoreDetailsScalarWhereInputSchema),z.lazy(() => SophomoreDetailsScalarWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hintsReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  student_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  participate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  many_fresh: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  instagram_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const StarterMagicVerseUpsertWithWhereUniqueWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUpsertWithWhereUniqueWithoutVersesInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateWithoutVersesInputSchema) ]),
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutVersesInputSchema) ]),
}).strict();

export const StarterMagicVerseUpdateWithWhereUniqueWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateWithWhereUniqueWithoutVersesInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarterMagicVerseUpdateWithoutVersesInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateWithoutVersesInputSchema) ]),
}).strict();

export const StarterMagicVerseUpdateManyWithWhereWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyWithWhereWithoutVersesInput> = z.object({
  where: z.lazy(() => StarterMagicVerseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarterMagicVerseUpdateManyMutationInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutStartersInputSchema) ]),
}).strict();

export const HintsCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsCreateWithoutSophomoreInput> = z.object({
  content: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  slug: z.lazy(() => HintSlugsCreateNestedOneWithoutHintsInputSchema),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesCreateNestedManyWithoutHintInputSchema).optional()
}).strict();

export const HintsUncheckedCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUncheckedCreateWithoutSophomoreInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUncheckedCreateNestedManyWithoutHintInputSchema).optional()
}).strict();

export const HintsCreateOrConnectWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsCreateOrConnectWithoutSophomoreInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const HintsCreateManySophomoreInputEnvelopeSchema: z.ZodType<Prisma.HintsCreateManySophomoreInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HintsCreateManySophomoreInputSchema),z.lazy(() => HintsCreateManySophomoreInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasscodeInstancesCreateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  content: z.string(),
  usedBy: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable(),
  content: z.string()
}).strict();

export const PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const PasscodeInstancesCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PasscodeInstancesCreateManyOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QRInstancesCreateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateWithoutOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  secret: z.string(),
  scannedBy: z.lazy(() => FreshmenDetailsCreateNestedManyWithoutScannedQrsInputSchema).optional()
}).strict();

export const QRInstancesUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  secret: z.string(),
  scannedBy: z.lazy(() => FreshmenDetailsUncheckedCreateNestedManyWithoutScannedQrsInputSchema).optional()
}).strict();

export const QRInstancesCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const QRInstancesCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.QRInstancesCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QRInstancesCreateManyOwnerInputSchema),z.lazy(() => QRInstancesCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserCreateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  faction: z.lazy(() => FactionsCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSophomoreDetailsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]),
}).strict();

export const PairCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.PairCreateWithoutSophomoreInput> = z.object({
  id: z.string().cuid().optional(),
  freshmen: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutPairInputSchema),
  revealedHints: z.lazy(() => RevealedHintInstancesCreateNestedManyWithoutPairInputSchema).optional()
}).strict();

export const PairUncheckedCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUncheckedCreateWithoutSophomoreInput> = z.object({
  id: z.string().cuid().optional(),
  freshmenDetailsId: z.string(),
  revealedHints: z.lazy(() => RevealedHintInstancesUncheckedCreateNestedManyWithoutPairInputSchema).optional()
}).strict();

export const PairCreateOrConnectWithoutSophomoreInputSchema: z.ZodType<Prisma.PairCreateOrConnectWithoutSophomoreInput> = z.object({
  where: z.lazy(() => PairWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PairCreateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const PairCreateManySophomoreInputEnvelopeSchema: z.ZodType<Prisma.PairCreateManySophomoreInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PairCreateManySophomoreInputSchema),z.lazy(() => PairCreateManySophomoreInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MagicVersesCreateWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesCreateWithoutSophomoresInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  casts: z.lazy(() => MagicVerseCastCreateNestedManyWithoutVersesInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesUncheckedCreateWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUncheckedCreateWithoutSophomoresInput> = z.object({
  handler: z.string(),
  name: z.string(),
  wildcard: z.boolean().optional(),
  cost: z.number().optional(),
  casts: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutVersesInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutVersesInputSchema).optional()
}).strict();

export const MagicVersesCreateOrConnectWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesCreateOrConnectWithoutSophomoresInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema) ]),
}).strict();

export const MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  content: z.string(),
  isExpired: z.boolean().optional()
}).strict();

export const MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  content: z.string(),
  isExpired: z.boolean().optional()
}).strict();

export const MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateOrConnectWithoutSophomoreDetailsInput> = z.object({
  where: z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema) ]),
}).strict();

export const MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputEnvelopeSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StarterMagicVerseCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateWithoutSophomoreInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutStartersInputSchema).optional(),
  fresh: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutStarterMagicVerseInputSchema)
}).strict();

export const StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedCreateWithoutSophomoreInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  freshmenDetailsId: z.string(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutStartersInputSchema).optional()
}).strict();

export const StarterMagicVerseCreateOrConnectWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateOrConnectWithoutSophomoreInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const StarterMagicVerseCreateManySophomoreInputEnvelopeSchema: z.ZodType<Prisma.StarterMagicVerseCreateManySophomoreInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StarterMagicVerseCreateManySophomoreInputSchema),z.lazy(() => StarterMagicVerseCreateManySophomoreInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MagicVerseCastCreateWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastCreateWithoutTargetInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  caster: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutMagicVerseCastInputSchema),
  verses: z.lazy(() => MagicVersesCreateNestedManyWithoutCastsInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedCreateWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedCreateWithoutTargetInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  casterId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedCreateNestedManyWithoutCastsInputSchema).optional()
}).strict();

export const MagicVerseCastCreateOrConnectWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastCreateOrConnectWithoutTargetInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema) ]),
}).strict();

export const MagicVerseCastCreateManyTargetInputEnvelopeSchema: z.ZodType<Prisma.MagicVerseCastCreateManyTargetInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MagicVerseCastCreateManyTargetInputSchema),z.lazy(() => MagicVerseCastCreateManyTargetInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HintsUpsertWithWhereUniqueWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUpsertWithWhereUniqueWithoutSophomoreInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HintsUpdateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedUpdateWithoutSophomoreInputSchema) ]),
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const HintsUpdateWithWhereUniqueWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUpdateWithWhereUniqueWithoutSophomoreInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HintsUpdateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedUpdateWithoutSophomoreInputSchema) ]),
}).strict();

export const HintsUpdateManyWithWhereWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUpdateManyWithWhereWithoutSophomoreInput> = z.object({
  where: z.lazy(() => HintsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HintsUpdateManyMutationInputSchema),z.lazy(() => HintsUncheckedUpdateManyWithoutHintsInputSchema) ]),
}).strict();

export const PasscodeInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PasscodeInstancesUpdateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const PasscodeInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PasscodeInstancesUpdateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const PasscodeInstancesUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => PasscodeInstancesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PasscodeInstancesUpdateManyMutationInputSchema),z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutPasscodeInstancesInputSchema) ]),
}).strict();

export const QRInstancesUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const QRInstancesUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QRInstancesUpdateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const QRInstancesUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => QRInstancesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QRInstancesUpdateManyMutationInputSchema),z.lazy(() => QRInstancesUncheckedUpdateManyWithoutQRInstancesInputSchema) ]),
}).strict();

export const UserUpsertWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSophomoreDetailsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSophomoreDetailsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  faction: z.lazy(() => FactionsUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PairUpsertWithWhereUniqueWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUpsertWithWhereUniqueWithoutSophomoreInput> = z.object({
  where: z.lazy(() => PairWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PairUpdateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedUpdateWithoutSophomoreInputSchema) ]),
  create: z.union([ z.lazy(() => PairCreateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const PairUpdateWithWhereUniqueWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUpdateWithWhereUniqueWithoutSophomoreInput> = z.object({
  where: z.lazy(() => PairWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PairUpdateWithoutSophomoreInputSchema),z.lazy(() => PairUncheckedUpdateWithoutSophomoreInputSchema) ]),
}).strict();

export const PairUpdateManyWithWhereWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUpdateManyWithWhereWithoutSophomoreInput> = z.object({
  where: z.lazy(() => PairScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PairUpdateManyMutationInputSchema),z.lazy(() => PairUncheckedUpdateManyWithoutPairInputSchema) ]),
}).strict();

export const PairScalarWhereInputSchema: z.ZodType<Prisma.PairScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PairScalarWhereInputSchema),z.lazy(() => PairScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PairScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PairScalarWhereInputSchema),z.lazy(() => PairScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MagicVersesUpsertWithWhereUniqueWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUpsertWithWhereUniqueWithoutSophomoresInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVersesUpdateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedUpdateWithoutSophomoresInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVersesCreateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedCreateWithoutSophomoresInputSchema) ]),
}).strict();

export const MagicVersesUpdateWithWhereUniqueWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUpdateWithWhereUniqueWithoutSophomoresInput> = z.object({
  where: z.lazy(() => MagicVersesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVersesUpdateWithoutSophomoresInputSchema),z.lazy(() => MagicVersesUncheckedUpdateWithoutSophomoresInputSchema) ]),
}).strict();

export const MagicVersesUpdateManyWithWhereWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUpdateManyWithWhereWithoutSophomoresInput> = z.object({
  where: z.lazy(() => MagicVersesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVersesUpdateManyMutationInputSchema),z.lazy(() => MagicVersesUncheckedUpdateManyWithoutVersesInputSchema) ]),
}).strict();

export const MagicVerseIdentificationInstanceUpsertWithWhereUniqueWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpsertWithWhereUniqueWithoutSophomoreDetailsInput> = z.object({
  where: z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateWithoutSophomoreDetailsInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVerseIdentificationInstanceCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedCreateWithoutSophomoreDetailsInputSchema) ]),
}).strict();

export const MagicVerseIdentificationInstanceUpdateWithWhereUniqueWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateWithWhereUniqueWithoutSophomoreDetailsInput> = z.object({
  where: z.lazy(() => MagicVerseIdentificationInstanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateWithoutSophomoreDetailsInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateWithoutSophomoreDetailsInputSchema) ]),
}).strict();

export const MagicVerseIdentificationInstanceUpdateManyWithWhereWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateManyWithWhereWithoutSophomoreDetailsInput> = z.object({
  where: z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVerseIdentificationInstanceUpdateManyMutationInputSchema),z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutMagicIdInstancesInputSchema) ]),
}).strict();

export const MagicVerseIdentificationInstanceScalarWhereInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema),z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema),z.lazy(() => MagicVerseIdentificationInstanceScalarWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreDetailsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isExpired: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const StarterMagicVerseUpsertWithWhereUniqueWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUpsertWithWhereUniqueWithoutSophomoreInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarterMagicVerseUpdateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateWithoutSophomoreInputSchema) ]),
  create: z.union([ z.lazy(() => StarterMagicVerseCreateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const StarterMagicVerseUpdateWithWhereUniqueWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateWithWhereUniqueWithoutSophomoreInput> = z.object({
  where: z.lazy(() => StarterMagicVerseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarterMagicVerseUpdateWithoutSophomoreInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateWithoutSophomoreInputSchema) ]),
}).strict();

export const StarterMagicVerseUpdateManyWithWhereWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyWithWhereWithoutSophomoreInput> = z.object({
  where: z.lazy(() => StarterMagicVerseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarterMagicVerseUpdateManyMutationInputSchema),z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutStarterVersesInputSchema) ]),
}).strict();

export const MagicVerseCastUpsertWithWhereUniqueWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUpsertWithWhereUniqueWithoutTargetInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicVerseCastUpdateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateWithoutTargetInputSchema) ]),
  create: z.union([ z.lazy(() => MagicVerseCastCreateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedCreateWithoutTargetInputSchema) ]),
}).strict();

export const MagicVerseCastUpdateWithWhereUniqueWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateWithWhereUniqueWithoutTargetInput> = z.object({
  where: z.lazy(() => MagicVerseCastWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicVerseCastUpdateWithoutTargetInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateWithoutTargetInputSchema) ]),
}).strict();

export const MagicVerseCastUpdateManyWithWhereWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyWithWhereWithoutTargetInput> = z.object({
  where: z.lazy(() => MagicVerseCastScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicVerseCastUpdateManyMutationInputSchema),z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutMagicVersesCastedInputSchema) ]),
}).strict();

export const FreshmenDetailsCreateWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutTodayResinInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairCreateNestedOneWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutTodayResinInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  userId: z.string(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  student_id: z.string(),
  title: z.lazy(() => NameTitleSchema),
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  branch: z.lazy(() => BranchSchema),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  phone: z.string(),
  passcodePoints: z.number().int().optional(),
  easterEgg: z.boolean().optional(),
  vip: z.boolean().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedCreateNestedOneWithoutFreshmenInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedCreateNestedManyWithoutFreshInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedCreateNestedManyWithoutCasterInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutTodayResinInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutTodayResinInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutTodayResinInputSchema) ]),
}).strict();

export const FreshmenDetailsUpsertWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutTodayResinInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutTodayResinInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutTodayResinInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutTodayResinInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutTodayResinInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutTodayResinInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutTodayResinInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutTodayResinInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQrs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsUpdateWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutScannedQrsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutScannedQrsInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutScannedQrsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateOneWithoutFreshmenNestedInputSchema).optional(),
  todayResin: z.lazy(() => TodayResinUncheckedUpdateManyWithoutFreshmenNestedInputSchema).optional(),
  StarterMagicVerse: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutFreshNestedInputSchema).optional(),
  MagicVerseCast: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutCasterNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateManyWithoutScannedByInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateManyWithoutScannedByInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passcodePoints: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  easterEgg: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyFactionInputSchema: z.ZodType<Prisma.UserCreateManyFactionInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  balance: z.number().int().optional()
}).strict();

export const UserUpdateWithoutFactionInputSchema: z.ZodType<Prisma.UserUpdateWithoutFactionInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFactionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFactionInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUsersInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => PlayerTypeSchema),z.lazy(() => EnumPlayerTypeFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesCreateManyPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateManyPairInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  hintsHintSlugId: z.string(),
  hintsSophomoreId: z.string()
}).strict();

export const RevealedHintInstancesUpdateWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateWithoutPairInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hint: z.lazy(() => HintsUpdateOneRequiredWithoutRevealedHintInstancesNestedInputSchema).optional()
}).strict();

export const RevealedHintInstancesUncheckedUpdateWithoutPairInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateWithoutPairInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hintsHintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hintsSophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedUpdateManyWithoutRevealedHintsInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateManyWithoutRevealedHintsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hintsHintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hintsSophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesCreateManyUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string(),
  content: z.string()
}).strict();

export const TodayResinCreateManyFreshmenInputSchema: z.ZodType<Prisma.TodayResinCreateManyFreshmenInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  quota: z.number().int().optional()
}).strict();

export const StarterMagicVerseCreateManyFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateManyFreshInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  sophomoreDetailsId: z.string()
}).strict();

export const MagicVerseCastCreateManyCasterInputSchema: z.ZodType<Prisma.MagicVerseCastCreateManyCasterInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  targetId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const PasscodeInstancesUpdateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateWithoutUsedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedUpdateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateWithoutUsedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyWithoutUsedPasscodesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUpdateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUpdateWithoutScannedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateWithoutScannedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUncheckedUpdateManyWithoutScannedQrsInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyWithoutScannedQrsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodayResinUpdateWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUpdateWithoutFreshmenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodayResinUncheckedUpdateWithoutFreshmenInputSchema: z.ZodType<Prisma.TodayResinUncheckedUpdateWithoutFreshmenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodayResinUncheckedUpdateManyWithoutTodayResinInputSchema: z.ZodType<Prisma.TodayResinUncheckedUpdateManyWithoutTodayResinInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseUpdateWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateWithoutFreshInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutStartersNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutStarterVersesNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseUncheckedUpdateWithoutFreshInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateWithoutFreshInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutStartersNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseUncheckedUpdateManyWithoutStarterMagicVerseInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyWithoutStarterMagicVerseInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseCastUpdateWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateWithoutCasterInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  target: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutMagicVersesCastedNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutCastsNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedUpdateWithoutCasterInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateWithoutCasterInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutCastsNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedUpdateManyWithoutMagicVerseCastInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyWithoutMagicVerseCastInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const HintsCreateManySlugInputSchema: z.ZodType<Prisma.HintsCreateManySlugInput> = z.object({
  content: z.string(),
  sophomoreId: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const HintsUpdateWithoutSlugInputSchema: z.ZodType<Prisma.HintsUpdateWithoutSlugInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInputSchema).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUpdateManyWithoutHintNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateWithoutSlugInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateWithoutSlugInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutHintNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateManyWithoutHintsInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateManyWithoutHintsInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesCreateManyHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesCreateManyHintInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  pairId: z.string()
}).strict();

export const RevealedHintInstancesUpdateWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateWithoutHintInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pair: z.lazy(() => PairUpdateOneRequiredWithoutRevealedHintsNestedInputSchema).optional()
}).strict();

export const RevealedHintInstancesUncheckedUpdateWithoutHintInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateWithoutHintInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pairId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RevealedHintInstancesUncheckedUpdateManyWithoutRevealedHintInstancesInputSchema: z.ZodType<Prisma.RevealedHintInstancesUncheckedUpdateManyWithoutRevealedHintInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pairId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVersesUpdateWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUpdateWithoutStartersInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  casts: z.lazy(() => MagicVerseCastUpdateManyWithoutVersesNestedInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVersesUncheckedUpdateWithoutStartersInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateWithoutStartersInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  casts: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutVersesNestedInputSchema).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUncheckedUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVersesUncheckedUpdateManyWithoutVersesInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateManyWithoutVersesInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVersesUpdateWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUpdateWithoutCastsInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUpdateManyWithoutVersesNestedInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVersesUncheckedUpdateWithoutCastsInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateWithoutCastsInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  sophomores: z.lazy(() => SophomoreDetailsUncheckedUpdateManyWithoutVersesNestedInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUpdateWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateWithoutVersesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  caster: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutMagicVerseCastNestedInputSchema).optional(),
  target: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutMagicVersesCastedNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedUpdateWithoutVersesInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateWithoutVersesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  casterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const MagicVerseCastUncheckedUpdateManyWithoutCastsInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyWithoutCastsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  casterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const SophomoreDetailsUpdateWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateWithoutVersesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSophomoreDetailsNestedInputSchema).optional(),
  pair: z.lazy(() => PairUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutVersesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutVersesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  pair: z.lazy(() => PairUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicIdInstances: z.lazy(() => MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutSophomoreDetailsNestedInputSchema).optional(),
  starterVerses: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  magicVersesCasted: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateManyWithoutSophomoresInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateManyWithoutSophomoresInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => SophomoreDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hintsReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => NameTitleSchema),z.lazy(() => EnumNameTitleFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nickname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchSchema),z.lazy(() => EnumBranchFieldUpdateOperationsInputSchema) ]).optional(),
  participate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  many_fresh: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  facebook_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instagram_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseUpdateWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateWithoutVersesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fresh: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutStarterMagicVerseNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutStarterVersesNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseUncheckedUpdateWithoutVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateWithoutVersesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseUncheckedUpdateManyWithoutStartersInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyWithoutStartersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsCreateManySophomoreInputSchema: z.ZodType<Prisma.HintsCreateManySophomoreInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  craete_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional()
}).strict();

export const PasscodeInstancesCreateManyOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable(),
  content: z.string()
}).strict();

export const QRInstancesCreateManyOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateManyOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  quota: z.number().int().optional(),
  secret: z.string()
}).strict();

export const PairCreateManySophomoreInputSchema: z.ZodType<Prisma.PairCreateManySophomoreInput> = z.object({
  id: z.string().cuid().optional(),
  freshmenDetailsId: z.string()
}).strict();

export const MagicVerseIdentificationInstanceCreateManySophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateManySophomoreDetailsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  content: z.string(),
  isExpired: z.boolean().optional()
}).strict();

export const StarterMagicVerseCreateManySophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseCreateManySophomoreInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  freshmenDetailsId: z.string()
}).strict();

export const MagicVerseCastCreateManyTargetInputSchema: z.ZodType<Prisma.MagicVerseCastCreateManyTargetInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  casterId: z.string(),
  result: z.union([ z.lazy(() => MagicVerseCastCreateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

export const HintsUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUpdateWithoutSophomoreInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.lazy(() => HintSlugsUpdateOneRequiredWithoutHintsNestedInputSchema).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUpdateManyWithoutHintNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateWithoutSophomoreInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  craete_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revealedHintInstances: z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutHintNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  usedBy: z.lazy(() => FreshmenDetailsUpdateOneWithoutUsedPasscodesNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyWithoutPasscodeInstancesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsUpdateManyWithoutScannedQrsNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsUncheckedUpdateManyWithoutScannedQrsNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateManyWithoutQRInstancesInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyWithoutQRInstancesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quota: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PairUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUpdateWithoutSophomoreInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmen: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutPairNestedInputSchema).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesUpdateManyWithoutPairNestedInputSchema).optional()
}).strict();

export const PairUncheckedUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.PairUncheckedUpdateWithoutSophomoreInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  revealedHints: z.lazy(() => RevealedHintInstancesUncheckedUpdateManyWithoutPairNestedInputSchema).optional()
}).strict();

export const PairUncheckedUpdateManyWithoutPairInputSchema: z.ZodType<Prisma.PairUncheckedUpdateManyWithoutPairInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVersesUpdateWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUpdateWithoutSophomoresInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  casts: z.lazy(() => MagicVerseCastUpdateManyWithoutVersesNestedInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVersesUncheckedUpdateWithoutSophomoresInputSchema: z.ZodType<Prisma.MagicVersesUncheckedUpdateWithoutSophomoresInput> = z.object({
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  wildcard: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  casts: z.lazy(() => MagicVerseCastUncheckedUpdateManyWithoutVersesNestedInputSchema).optional(),
  starters: z.lazy(() => StarterMagicVerseUncheckedUpdateManyWithoutVersesNestedInputSchema).optional()
}).strict();

export const MagicVerseIdentificationInstanceUpdateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceUncheckedUpdateWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedUpdateWithoutSophomoreDetailsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutMagicIdInstancesInputSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUncheckedUpdateManyWithoutMagicIdInstancesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isExpired: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarterMagicVerseUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUpdateWithoutSophomoreInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutStartersNestedInputSchema).optional(),
  fresh: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutStarterMagicVerseNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseUncheckedUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateWithoutSophomoreInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutStartersNestedInputSchema).optional()
}).strict();

export const StarterMagicVerseUncheckedUpdateManyWithoutStarterVersesInputSchema: z.ZodType<Prisma.StarterMagicVerseUncheckedUpdateManyWithoutStarterVersesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MagicVerseCastUpdateWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUpdateWithoutTargetInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  caster: z.lazy(() => FreshmenDetailsUpdateOneRequiredWithoutMagicVerseCastNestedInputSchema).optional(),
  verses: z.lazy(() => MagicVersesUpdateManyWithoutCastsNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedUpdateWithoutTargetInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateWithoutTargetInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  casterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
  verses: z.lazy(() => MagicVersesUncheckedUpdateManyWithoutCastsNestedInputSchema).optional()
}).strict();

export const MagicVerseCastUncheckedUpdateManyWithoutMagicVersesCastedInputSchema: z.ZodType<Prisma.MagicVerseCastUncheckedUpdateManyWithoutMagicVersesCastedInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  casterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.union([ z.lazy(() => MagicVerseCastUpdateresultInputSchema),z.boolean().array() ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const QRInstancesFindFirstArgsSchema: z.ZodType<Prisma.QRInstancesFindFirstArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereInputSchema.optional(),
  orderBy: z.union([ QRInstancesOrderByWithRelationInputSchema.array(),QRInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: QRInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QRInstancesScalarFieldEnumSchema,QRInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const QRInstancesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QRInstancesFindFirstOrThrowArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereInputSchema.optional(),
  orderBy: z.union([ QRInstancesOrderByWithRelationInputSchema.array(),QRInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: QRInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QRInstancesScalarFieldEnumSchema,QRInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const QRInstancesFindManyArgsSchema: z.ZodType<Prisma.QRInstancesFindManyArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereInputSchema.optional(),
  orderBy: z.union([ QRInstancesOrderByWithRelationInputSchema.array(),QRInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: QRInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QRInstancesScalarFieldEnumSchema,QRInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const QRInstancesAggregateArgsSchema: z.ZodType<Prisma.QRInstancesAggregateArgs> = z.object({
  where: QRInstancesWhereInputSchema.optional(),
  orderBy: z.union([ QRInstancesOrderByWithRelationInputSchema.array(),QRInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: QRInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const QRInstancesGroupByArgsSchema: z.ZodType<Prisma.QRInstancesGroupByArgs> = z.object({
  where: QRInstancesWhereInputSchema.optional(),
  orderBy: z.union([ QRInstancesOrderByWithAggregationInputSchema.array(),QRInstancesOrderByWithAggregationInputSchema ]).optional(),
  by: QRInstancesScalarFieldEnumSchema.array(),
  having: QRInstancesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const QRInstancesFindUniqueArgsSchema: z.ZodType<Prisma.QRInstancesFindUniqueArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereUniqueInputSchema,
}).strict()

export const QRInstancesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.QRInstancesFindUniqueOrThrowArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereUniqueInputSchema,
}).strict()

export const PasscodeInstancesFindFirstArgsSchema: z.ZodType<Prisma.PasscodeInstancesFindFirstArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereInputSchema.optional(),
  orderBy: z.union([ PasscodeInstancesOrderByWithRelationInputSchema.array(),PasscodeInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: PasscodeInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasscodeInstancesScalarFieldEnumSchema,PasscodeInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PasscodeInstancesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasscodeInstancesFindFirstOrThrowArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereInputSchema.optional(),
  orderBy: z.union([ PasscodeInstancesOrderByWithRelationInputSchema.array(),PasscodeInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: PasscodeInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasscodeInstancesScalarFieldEnumSchema,PasscodeInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PasscodeInstancesFindManyArgsSchema: z.ZodType<Prisma.PasscodeInstancesFindManyArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereInputSchema.optional(),
  orderBy: z.union([ PasscodeInstancesOrderByWithRelationInputSchema.array(),PasscodeInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: PasscodeInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasscodeInstancesScalarFieldEnumSchema,PasscodeInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PasscodeInstancesAggregateArgsSchema: z.ZodType<Prisma.PasscodeInstancesAggregateArgs> = z.object({
  where: PasscodeInstancesWhereInputSchema.optional(),
  orderBy: z.union([ PasscodeInstancesOrderByWithRelationInputSchema.array(),PasscodeInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: PasscodeInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PasscodeInstancesGroupByArgsSchema: z.ZodType<Prisma.PasscodeInstancesGroupByArgs> = z.object({
  where: PasscodeInstancesWhereInputSchema.optional(),
  orderBy: z.union([ PasscodeInstancesOrderByWithAggregationInputSchema.array(),PasscodeInstancesOrderByWithAggregationInputSchema ]).optional(),
  by: PasscodeInstancesScalarFieldEnumSchema.array(),
  having: PasscodeInstancesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PasscodeInstancesFindUniqueArgsSchema: z.ZodType<Prisma.PasscodeInstancesFindUniqueArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereUniqueInputSchema,
}).strict()

export const PasscodeInstancesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasscodeInstancesFindUniqueOrThrowArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereUniqueInputSchema,
}).strict()

export const FactionsFindFirstArgsSchema: z.ZodType<Prisma.FactionsFindFirstArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereInputSchema.optional(),
  orderBy: z.union([ FactionsOrderByWithRelationInputSchema.array(),FactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FactionsScalarFieldEnumSchema,FactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FactionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FactionsFindFirstOrThrowArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereInputSchema.optional(),
  orderBy: z.union([ FactionsOrderByWithRelationInputSchema.array(),FactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FactionsScalarFieldEnumSchema,FactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FactionsFindManyArgsSchema: z.ZodType<Prisma.FactionsFindManyArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereInputSchema.optional(),
  orderBy: z.union([ FactionsOrderByWithRelationInputSchema.array(),FactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FactionsScalarFieldEnumSchema,FactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FactionsAggregateArgsSchema: z.ZodType<Prisma.FactionsAggregateArgs> = z.object({
  where: FactionsWhereInputSchema.optional(),
  orderBy: z.union([ FactionsOrderByWithRelationInputSchema.array(),FactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FactionsGroupByArgsSchema: z.ZodType<Prisma.FactionsGroupByArgs> = z.object({
  where: FactionsWhereInputSchema.optional(),
  orderBy: z.union([ FactionsOrderByWithAggregationInputSchema.array(),FactionsOrderByWithAggregationInputSchema ]).optional(),
  by: FactionsScalarFieldEnumSchema.array(),
  having: FactionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FactionsFindUniqueArgsSchema: z.ZodType<Prisma.FactionsFindUniqueArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereUniqueInputSchema,
}).strict()

export const FactionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FactionsFindUniqueOrThrowArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereUniqueInputSchema,
}).strict()

export const RevealedHintInstancesFindFirstArgsSchema: z.ZodType<Prisma.RevealedHintInstancesFindFirstArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereInputSchema.optional(),
  orderBy: z.union([ RevealedHintInstancesOrderByWithRelationInputSchema.array(),RevealedHintInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: RevealedHintInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RevealedHintInstancesScalarFieldEnumSchema,RevealedHintInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RevealedHintInstancesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RevealedHintInstancesFindFirstOrThrowArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereInputSchema.optional(),
  orderBy: z.union([ RevealedHintInstancesOrderByWithRelationInputSchema.array(),RevealedHintInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: RevealedHintInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RevealedHintInstancesScalarFieldEnumSchema,RevealedHintInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RevealedHintInstancesFindManyArgsSchema: z.ZodType<Prisma.RevealedHintInstancesFindManyArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereInputSchema.optional(),
  orderBy: z.union([ RevealedHintInstancesOrderByWithRelationInputSchema.array(),RevealedHintInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: RevealedHintInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RevealedHintInstancesScalarFieldEnumSchema,RevealedHintInstancesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RevealedHintInstancesAggregateArgsSchema: z.ZodType<Prisma.RevealedHintInstancesAggregateArgs> = z.object({
  where: RevealedHintInstancesWhereInputSchema.optional(),
  orderBy: z.union([ RevealedHintInstancesOrderByWithRelationInputSchema.array(),RevealedHintInstancesOrderByWithRelationInputSchema ]).optional(),
  cursor: RevealedHintInstancesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RevealedHintInstancesGroupByArgsSchema: z.ZodType<Prisma.RevealedHintInstancesGroupByArgs> = z.object({
  where: RevealedHintInstancesWhereInputSchema.optional(),
  orderBy: z.union([ RevealedHintInstancesOrderByWithAggregationInputSchema.array(),RevealedHintInstancesOrderByWithAggregationInputSchema ]).optional(),
  by: RevealedHintInstancesScalarFieldEnumSchema.array(),
  having: RevealedHintInstancesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RevealedHintInstancesFindUniqueArgsSchema: z.ZodType<Prisma.RevealedHintInstancesFindUniqueArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereUniqueInputSchema,
}).strict()

export const RevealedHintInstancesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RevealedHintInstancesFindUniqueOrThrowArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereUniqueInputSchema,
}).strict()

export const PairFindFirstArgsSchema: z.ZodType<Prisma.PairFindFirstArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereInputSchema.optional(),
  orderBy: z.union([ PairOrderByWithRelationInputSchema.array(),PairOrderByWithRelationInputSchema ]).optional(),
  cursor: PairWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PairScalarFieldEnumSchema,PairScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PairFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PairFindFirstOrThrowArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereInputSchema.optional(),
  orderBy: z.union([ PairOrderByWithRelationInputSchema.array(),PairOrderByWithRelationInputSchema ]).optional(),
  cursor: PairWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PairScalarFieldEnumSchema,PairScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PairFindManyArgsSchema: z.ZodType<Prisma.PairFindManyArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereInputSchema.optional(),
  orderBy: z.union([ PairOrderByWithRelationInputSchema.array(),PairOrderByWithRelationInputSchema ]).optional(),
  cursor: PairWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PairScalarFieldEnumSchema,PairScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PairAggregateArgsSchema: z.ZodType<Prisma.PairAggregateArgs> = z.object({
  where: PairWhereInputSchema.optional(),
  orderBy: z.union([ PairOrderByWithRelationInputSchema.array(),PairOrderByWithRelationInputSchema ]).optional(),
  cursor: PairWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PairGroupByArgsSchema: z.ZodType<Prisma.PairGroupByArgs> = z.object({
  where: PairWhereInputSchema.optional(),
  orderBy: z.union([ PairOrderByWithAggregationInputSchema.array(),PairOrderByWithAggregationInputSchema ]).optional(),
  by: PairScalarFieldEnumSchema.array(),
  having: PairScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PairFindUniqueArgsSchema: z.ZodType<Prisma.PairFindUniqueArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereUniqueInputSchema,
}).strict()

export const PairFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PairFindUniqueOrThrowArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereUniqueInputSchema,
}).strict()

export const FreshmenDetailsFindFirstArgsSchema: z.ZodType<Prisma.FreshmenDetailsFindFirstArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereInputSchema.optional(),
  orderBy: z.union([ FreshmenDetailsOrderByWithRelationInputSchema.array(),FreshmenDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: FreshmenDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FreshmenDetailsScalarFieldEnumSchema,FreshmenDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FreshmenDetailsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FreshmenDetailsFindFirstOrThrowArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereInputSchema.optional(),
  orderBy: z.union([ FreshmenDetailsOrderByWithRelationInputSchema.array(),FreshmenDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: FreshmenDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FreshmenDetailsScalarFieldEnumSchema,FreshmenDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FreshmenDetailsFindManyArgsSchema: z.ZodType<Prisma.FreshmenDetailsFindManyArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereInputSchema.optional(),
  orderBy: z.union([ FreshmenDetailsOrderByWithRelationInputSchema.array(),FreshmenDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: FreshmenDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FreshmenDetailsScalarFieldEnumSchema,FreshmenDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FreshmenDetailsAggregateArgsSchema: z.ZodType<Prisma.FreshmenDetailsAggregateArgs> = z.object({
  where: FreshmenDetailsWhereInputSchema.optional(),
  orderBy: z.union([ FreshmenDetailsOrderByWithRelationInputSchema.array(),FreshmenDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: FreshmenDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FreshmenDetailsGroupByArgsSchema: z.ZodType<Prisma.FreshmenDetailsGroupByArgs> = z.object({
  where: FreshmenDetailsWhereInputSchema.optional(),
  orderBy: z.union([ FreshmenDetailsOrderByWithAggregationInputSchema.array(),FreshmenDetailsOrderByWithAggregationInputSchema ]).optional(),
  by: FreshmenDetailsScalarFieldEnumSchema.array(),
  having: FreshmenDetailsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FreshmenDetailsFindUniqueArgsSchema: z.ZodType<Prisma.FreshmenDetailsFindUniqueArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereUniqueInputSchema,
}).strict()

export const FreshmenDetailsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FreshmenDetailsFindUniqueOrThrowArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereUniqueInputSchema,
}).strict()

export const HintSlugsFindFirstArgsSchema: z.ZodType<Prisma.HintSlugsFindFirstArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereInputSchema.optional(),
  orderBy: z.union([ HintSlugsOrderByWithRelationInputSchema.array(),HintSlugsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintSlugsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HintSlugsScalarFieldEnumSchema,HintSlugsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HintSlugsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HintSlugsFindFirstOrThrowArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereInputSchema.optional(),
  orderBy: z.union([ HintSlugsOrderByWithRelationInputSchema.array(),HintSlugsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintSlugsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HintSlugsScalarFieldEnumSchema,HintSlugsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HintSlugsFindManyArgsSchema: z.ZodType<Prisma.HintSlugsFindManyArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereInputSchema.optional(),
  orderBy: z.union([ HintSlugsOrderByWithRelationInputSchema.array(),HintSlugsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintSlugsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HintSlugsScalarFieldEnumSchema,HintSlugsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HintSlugsAggregateArgsSchema: z.ZodType<Prisma.HintSlugsAggregateArgs> = z.object({
  where: HintSlugsWhereInputSchema.optional(),
  orderBy: z.union([ HintSlugsOrderByWithRelationInputSchema.array(),HintSlugsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintSlugsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HintSlugsGroupByArgsSchema: z.ZodType<Prisma.HintSlugsGroupByArgs> = z.object({
  where: HintSlugsWhereInputSchema.optional(),
  orderBy: z.union([ HintSlugsOrderByWithAggregationInputSchema.array(),HintSlugsOrderByWithAggregationInputSchema ]).optional(),
  by: HintSlugsScalarFieldEnumSchema.array(),
  having: HintSlugsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HintSlugsFindUniqueArgsSchema: z.ZodType<Prisma.HintSlugsFindUniqueArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereUniqueInputSchema,
}).strict()

export const HintSlugsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HintSlugsFindUniqueOrThrowArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereUniqueInputSchema,
}).strict()

export const HintsFindFirstArgsSchema: z.ZodType<Prisma.HintsFindFirstArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereInputSchema.optional(),
  orderBy: z.union([ HintsOrderByWithRelationInputSchema.array(),HintsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HintsScalarFieldEnumSchema,HintsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HintsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HintsFindFirstOrThrowArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereInputSchema.optional(),
  orderBy: z.union([ HintsOrderByWithRelationInputSchema.array(),HintsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HintsScalarFieldEnumSchema,HintsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HintsFindManyArgsSchema: z.ZodType<Prisma.HintsFindManyArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereInputSchema.optional(),
  orderBy: z.union([ HintsOrderByWithRelationInputSchema.array(),HintsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HintsScalarFieldEnumSchema,HintsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HintsAggregateArgsSchema: z.ZodType<Prisma.HintsAggregateArgs> = z.object({
  where: HintsWhereInputSchema.optional(),
  orderBy: z.union([ HintsOrderByWithRelationInputSchema.array(),HintsOrderByWithRelationInputSchema ]).optional(),
  cursor: HintsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HintsGroupByArgsSchema: z.ZodType<Prisma.HintsGroupByArgs> = z.object({
  where: HintsWhereInputSchema.optional(),
  orderBy: z.union([ HintsOrderByWithAggregationInputSchema.array(),HintsOrderByWithAggregationInputSchema ]).optional(),
  by: HintsScalarFieldEnumSchema.array(),
  having: HintsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HintsFindUniqueArgsSchema: z.ZodType<Prisma.HintsFindUniqueArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereUniqueInputSchema,
}).strict()

export const HintsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HintsFindUniqueOrThrowArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereUniqueInputSchema,
}).strict()

export const MagicVerseIdentificationInstanceFindFirstArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceFindFirstArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseIdentificationInstanceOrderByWithRelationInputSchema.array(),MagicVerseIdentificationInstanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseIdentificationInstanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVerseIdentificationInstanceScalarFieldEnumSchema,MagicVerseIdentificationInstanceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVerseIdentificationInstanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceFindFirstOrThrowArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseIdentificationInstanceOrderByWithRelationInputSchema.array(),MagicVerseIdentificationInstanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseIdentificationInstanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVerseIdentificationInstanceScalarFieldEnumSchema,MagicVerseIdentificationInstanceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVerseIdentificationInstanceFindManyArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceFindManyArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseIdentificationInstanceOrderByWithRelationInputSchema.array(),MagicVerseIdentificationInstanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseIdentificationInstanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVerseIdentificationInstanceScalarFieldEnumSchema,MagicVerseIdentificationInstanceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVerseIdentificationInstanceAggregateArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceAggregateArgs> = z.object({
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseIdentificationInstanceOrderByWithRelationInputSchema.array(),MagicVerseIdentificationInstanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseIdentificationInstanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MagicVerseIdentificationInstanceGroupByArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceGroupByArgs> = z.object({
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseIdentificationInstanceOrderByWithAggregationInputSchema.array(),MagicVerseIdentificationInstanceOrderByWithAggregationInputSchema ]).optional(),
  by: MagicVerseIdentificationInstanceScalarFieldEnumSchema.array(),
  having: MagicVerseIdentificationInstanceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MagicVerseIdentificationInstanceFindUniqueArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceFindUniqueArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereUniqueInputSchema,
}).strict()

export const MagicVerseIdentificationInstanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceFindUniqueOrThrowArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereUniqueInputSchema,
}).strict()

export const StarterMagicVerseFindFirstArgsSchema: z.ZodType<Prisma.StarterMagicVerseFindFirstArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereInputSchema.optional(),
  orderBy: z.union([ StarterMagicVerseOrderByWithRelationInputSchema.array(),StarterMagicVerseOrderByWithRelationInputSchema ]).optional(),
  cursor: StarterMagicVerseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarterMagicVerseScalarFieldEnumSchema,StarterMagicVerseScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StarterMagicVerseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StarterMagicVerseFindFirstOrThrowArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereInputSchema.optional(),
  orderBy: z.union([ StarterMagicVerseOrderByWithRelationInputSchema.array(),StarterMagicVerseOrderByWithRelationInputSchema ]).optional(),
  cursor: StarterMagicVerseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarterMagicVerseScalarFieldEnumSchema,StarterMagicVerseScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StarterMagicVerseFindManyArgsSchema: z.ZodType<Prisma.StarterMagicVerseFindManyArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereInputSchema.optional(),
  orderBy: z.union([ StarterMagicVerseOrderByWithRelationInputSchema.array(),StarterMagicVerseOrderByWithRelationInputSchema ]).optional(),
  cursor: StarterMagicVerseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarterMagicVerseScalarFieldEnumSchema,StarterMagicVerseScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StarterMagicVerseAggregateArgsSchema: z.ZodType<Prisma.StarterMagicVerseAggregateArgs> = z.object({
  where: StarterMagicVerseWhereInputSchema.optional(),
  orderBy: z.union([ StarterMagicVerseOrderByWithRelationInputSchema.array(),StarterMagicVerseOrderByWithRelationInputSchema ]).optional(),
  cursor: StarterMagicVerseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StarterMagicVerseGroupByArgsSchema: z.ZodType<Prisma.StarterMagicVerseGroupByArgs> = z.object({
  where: StarterMagicVerseWhereInputSchema.optional(),
  orderBy: z.union([ StarterMagicVerseOrderByWithAggregationInputSchema.array(),StarterMagicVerseOrderByWithAggregationInputSchema ]).optional(),
  by: StarterMagicVerseScalarFieldEnumSchema.array(),
  having: StarterMagicVerseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StarterMagicVerseFindUniqueArgsSchema: z.ZodType<Prisma.StarterMagicVerseFindUniqueArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereUniqueInputSchema,
}).strict()

export const StarterMagicVerseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StarterMagicVerseFindUniqueOrThrowArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereUniqueInputSchema,
}).strict()

export const MagicVerseCastFindFirstArgsSchema: z.ZodType<Prisma.MagicVerseCastFindFirstArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseCastOrderByWithRelationInputSchema.array(),MagicVerseCastOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseCastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVerseCastScalarFieldEnumSchema,MagicVerseCastScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVerseCastFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MagicVerseCastFindFirstOrThrowArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseCastOrderByWithRelationInputSchema.array(),MagicVerseCastOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseCastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVerseCastScalarFieldEnumSchema,MagicVerseCastScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVerseCastFindManyArgsSchema: z.ZodType<Prisma.MagicVerseCastFindManyArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseCastOrderByWithRelationInputSchema.array(),MagicVerseCastOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseCastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVerseCastScalarFieldEnumSchema,MagicVerseCastScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVerseCastAggregateArgsSchema: z.ZodType<Prisma.MagicVerseCastAggregateArgs> = z.object({
  where: MagicVerseCastWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseCastOrderByWithRelationInputSchema.array(),MagicVerseCastOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVerseCastWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MagicVerseCastGroupByArgsSchema: z.ZodType<Prisma.MagicVerseCastGroupByArgs> = z.object({
  where: MagicVerseCastWhereInputSchema.optional(),
  orderBy: z.union([ MagicVerseCastOrderByWithAggregationInputSchema.array(),MagicVerseCastOrderByWithAggregationInputSchema ]).optional(),
  by: MagicVerseCastScalarFieldEnumSchema.array(),
  having: MagicVerseCastScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MagicVerseCastFindUniqueArgsSchema: z.ZodType<Prisma.MagicVerseCastFindUniqueArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereUniqueInputSchema,
}).strict()

export const MagicVerseCastFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MagicVerseCastFindUniqueOrThrowArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereUniqueInputSchema,
}).strict()

export const MagicVersesFindFirstArgsSchema: z.ZodType<Prisma.MagicVersesFindFirstArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereInputSchema.optional(),
  orderBy: z.union([ MagicVersesOrderByWithRelationInputSchema.array(),MagicVersesOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVersesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVersesScalarFieldEnumSchema,MagicVersesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVersesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MagicVersesFindFirstOrThrowArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereInputSchema.optional(),
  orderBy: z.union([ MagicVersesOrderByWithRelationInputSchema.array(),MagicVersesOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVersesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVersesScalarFieldEnumSchema,MagicVersesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVersesFindManyArgsSchema: z.ZodType<Prisma.MagicVersesFindManyArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereInputSchema.optional(),
  orderBy: z.union([ MagicVersesOrderByWithRelationInputSchema.array(),MagicVersesOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVersesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicVersesScalarFieldEnumSchema,MagicVersesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MagicVersesAggregateArgsSchema: z.ZodType<Prisma.MagicVersesAggregateArgs> = z.object({
  where: MagicVersesWhereInputSchema.optional(),
  orderBy: z.union([ MagicVersesOrderByWithRelationInputSchema.array(),MagicVersesOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicVersesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MagicVersesGroupByArgsSchema: z.ZodType<Prisma.MagicVersesGroupByArgs> = z.object({
  where: MagicVersesWhereInputSchema.optional(),
  orderBy: z.union([ MagicVersesOrderByWithAggregationInputSchema.array(),MagicVersesOrderByWithAggregationInputSchema ]).optional(),
  by: MagicVersesScalarFieldEnumSchema.array(),
  having: MagicVersesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MagicVersesFindUniqueArgsSchema: z.ZodType<Prisma.MagicVersesFindUniqueArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereUniqueInputSchema,
}).strict()

export const MagicVersesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MagicVersesFindUniqueOrThrowArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereUniqueInputSchema,
}).strict()

export const SophomoreDetailsFindFirstArgsSchema: z.ZodType<Prisma.SophomoreDetailsFindFirstArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereInputSchema.optional(),
  orderBy: z.union([ SophomoreDetailsOrderByWithRelationInputSchema.array(),SophomoreDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SophomoreDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SophomoreDetailsScalarFieldEnumSchema,SophomoreDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SophomoreDetailsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SophomoreDetailsFindFirstOrThrowArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereInputSchema.optional(),
  orderBy: z.union([ SophomoreDetailsOrderByWithRelationInputSchema.array(),SophomoreDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SophomoreDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SophomoreDetailsScalarFieldEnumSchema,SophomoreDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SophomoreDetailsFindManyArgsSchema: z.ZodType<Prisma.SophomoreDetailsFindManyArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereInputSchema.optional(),
  orderBy: z.union([ SophomoreDetailsOrderByWithRelationInputSchema.array(),SophomoreDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SophomoreDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SophomoreDetailsScalarFieldEnumSchema,SophomoreDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SophomoreDetailsAggregateArgsSchema: z.ZodType<Prisma.SophomoreDetailsAggregateArgs> = z.object({
  where: SophomoreDetailsWhereInputSchema.optional(),
  orderBy: z.union([ SophomoreDetailsOrderByWithRelationInputSchema.array(),SophomoreDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SophomoreDetailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SophomoreDetailsGroupByArgsSchema: z.ZodType<Prisma.SophomoreDetailsGroupByArgs> = z.object({
  where: SophomoreDetailsWhereInputSchema.optional(),
  orderBy: z.union([ SophomoreDetailsOrderByWithAggregationInputSchema.array(),SophomoreDetailsOrderByWithAggregationInputSchema ]).optional(),
  by: SophomoreDetailsScalarFieldEnumSchema.array(),
  having: SophomoreDetailsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SophomoreDetailsFindUniqueArgsSchema: z.ZodType<Prisma.SophomoreDetailsFindUniqueArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereUniqueInputSchema,
}).strict()

export const SophomoreDetailsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SophomoreDetailsFindUniqueOrThrowArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereUniqueInputSchema,
}).strict()

export const TodayResinFindFirstArgsSchema: z.ZodType<Prisma.TodayResinFindFirstArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereInputSchema.optional(),
  orderBy: z.union([ TodayResinOrderByWithRelationInputSchema.array(),TodayResinOrderByWithRelationInputSchema ]).optional(),
  cursor: TodayResinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodayResinScalarFieldEnumSchema,TodayResinScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TodayResinFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TodayResinFindFirstOrThrowArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereInputSchema.optional(),
  orderBy: z.union([ TodayResinOrderByWithRelationInputSchema.array(),TodayResinOrderByWithRelationInputSchema ]).optional(),
  cursor: TodayResinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodayResinScalarFieldEnumSchema,TodayResinScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TodayResinFindManyArgsSchema: z.ZodType<Prisma.TodayResinFindManyArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereInputSchema.optional(),
  orderBy: z.union([ TodayResinOrderByWithRelationInputSchema.array(),TodayResinOrderByWithRelationInputSchema ]).optional(),
  cursor: TodayResinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodayResinScalarFieldEnumSchema,TodayResinScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TodayResinAggregateArgsSchema: z.ZodType<Prisma.TodayResinAggregateArgs> = z.object({
  where: TodayResinWhereInputSchema.optional(),
  orderBy: z.union([ TodayResinOrderByWithRelationInputSchema.array(),TodayResinOrderByWithRelationInputSchema ]).optional(),
  cursor: TodayResinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TodayResinGroupByArgsSchema: z.ZodType<Prisma.TodayResinGroupByArgs> = z.object({
  where: TodayResinWhereInputSchema.optional(),
  orderBy: z.union([ TodayResinOrderByWithAggregationInputSchema.array(),TodayResinOrderByWithAggregationInputSchema ]).optional(),
  by: TodayResinScalarFieldEnumSchema.array(),
  having: TodayResinScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TodayResinFindUniqueArgsSchema: z.ZodType<Prisma.TodayResinFindUniqueArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereUniqueInputSchema,
}).strict()

export const TodayResinFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TodayResinFindUniqueOrThrowArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const QRInstancesCreateArgsSchema: z.ZodType<Prisma.QRInstancesCreateArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  data: z.union([ QRInstancesCreateInputSchema,QRInstancesUncheckedCreateInputSchema ]),
}).strict()

export const QRInstancesUpsertArgsSchema: z.ZodType<Prisma.QRInstancesUpsertArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereUniqueInputSchema,
  create: z.union([ QRInstancesCreateInputSchema,QRInstancesUncheckedCreateInputSchema ]),
  update: z.union([ QRInstancesUpdateInputSchema,QRInstancesUncheckedUpdateInputSchema ]),
}).strict()

export const QRInstancesCreateManyArgsSchema: z.ZodType<Prisma.QRInstancesCreateManyArgs> = z.object({
  data: z.union([ QRInstancesCreateManyInputSchema,QRInstancesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const QRInstancesDeleteArgsSchema: z.ZodType<Prisma.QRInstancesDeleteArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  where: QRInstancesWhereUniqueInputSchema,
}).strict()

export const QRInstancesUpdateArgsSchema: z.ZodType<Prisma.QRInstancesUpdateArgs> = z.object({
  select: QRInstancesSelectSchema.optional(),
  include: QRInstancesIncludeSchema.optional(),
  data: z.union([ QRInstancesUpdateInputSchema,QRInstancesUncheckedUpdateInputSchema ]),
  where: QRInstancesWhereUniqueInputSchema,
}).strict()

export const QRInstancesUpdateManyArgsSchema: z.ZodType<Prisma.QRInstancesUpdateManyArgs> = z.object({
  data: z.union([ QRInstancesUpdateManyMutationInputSchema,QRInstancesUncheckedUpdateManyInputSchema ]),
  where: QRInstancesWhereInputSchema.optional(),
}).strict()

export const QRInstancesDeleteManyArgsSchema: z.ZodType<Prisma.QRInstancesDeleteManyArgs> = z.object({
  where: QRInstancesWhereInputSchema.optional(),
}).strict()

export const PasscodeInstancesCreateArgsSchema: z.ZodType<Prisma.PasscodeInstancesCreateArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  data: z.union([ PasscodeInstancesCreateInputSchema,PasscodeInstancesUncheckedCreateInputSchema ]),
}).strict()

export const PasscodeInstancesUpsertArgsSchema: z.ZodType<Prisma.PasscodeInstancesUpsertArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereUniqueInputSchema,
  create: z.union([ PasscodeInstancesCreateInputSchema,PasscodeInstancesUncheckedCreateInputSchema ]),
  update: z.union([ PasscodeInstancesUpdateInputSchema,PasscodeInstancesUncheckedUpdateInputSchema ]),
}).strict()

export const PasscodeInstancesCreateManyArgsSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyArgs> = z.object({
  data: z.union([ PasscodeInstancesCreateManyInputSchema,PasscodeInstancesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PasscodeInstancesDeleteArgsSchema: z.ZodType<Prisma.PasscodeInstancesDeleteArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  where: PasscodeInstancesWhereUniqueInputSchema,
}).strict()

export const PasscodeInstancesUpdateArgsSchema: z.ZodType<Prisma.PasscodeInstancesUpdateArgs> = z.object({
  select: PasscodeInstancesSelectSchema.optional(),
  include: PasscodeInstancesIncludeSchema.optional(),
  data: z.union([ PasscodeInstancesUpdateInputSchema,PasscodeInstancesUncheckedUpdateInputSchema ]),
  where: PasscodeInstancesWhereUniqueInputSchema,
}).strict()

export const PasscodeInstancesUpdateManyArgsSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyArgs> = z.object({
  data: z.union([ PasscodeInstancesUpdateManyMutationInputSchema,PasscodeInstancesUncheckedUpdateManyInputSchema ]),
  where: PasscodeInstancesWhereInputSchema.optional(),
}).strict()

export const PasscodeInstancesDeleteManyArgsSchema: z.ZodType<Prisma.PasscodeInstancesDeleteManyArgs> = z.object({
  where: PasscodeInstancesWhereInputSchema.optional(),
}).strict()

export const FactionsCreateArgsSchema: z.ZodType<Prisma.FactionsCreateArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  data: z.union([ FactionsCreateInputSchema,FactionsUncheckedCreateInputSchema ]),
}).strict()

export const FactionsUpsertArgsSchema: z.ZodType<Prisma.FactionsUpsertArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereUniqueInputSchema,
  create: z.union([ FactionsCreateInputSchema,FactionsUncheckedCreateInputSchema ]),
  update: z.union([ FactionsUpdateInputSchema,FactionsUncheckedUpdateInputSchema ]),
}).strict()

export const FactionsCreateManyArgsSchema: z.ZodType<Prisma.FactionsCreateManyArgs> = z.object({
  data: z.union([ FactionsCreateManyInputSchema,FactionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FactionsDeleteArgsSchema: z.ZodType<Prisma.FactionsDeleteArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  where: FactionsWhereUniqueInputSchema,
}).strict()

export const FactionsUpdateArgsSchema: z.ZodType<Prisma.FactionsUpdateArgs> = z.object({
  select: FactionsSelectSchema.optional(),
  include: FactionsIncludeSchema.optional(),
  data: z.union([ FactionsUpdateInputSchema,FactionsUncheckedUpdateInputSchema ]),
  where: FactionsWhereUniqueInputSchema,
}).strict()

export const FactionsUpdateManyArgsSchema: z.ZodType<Prisma.FactionsUpdateManyArgs> = z.object({
  data: z.union([ FactionsUpdateManyMutationInputSchema,FactionsUncheckedUpdateManyInputSchema ]),
  where: FactionsWhereInputSchema.optional(),
}).strict()

export const FactionsDeleteManyArgsSchema: z.ZodType<Prisma.FactionsDeleteManyArgs> = z.object({
  where: FactionsWhereInputSchema.optional(),
}).strict()

export const RevealedHintInstancesCreateArgsSchema: z.ZodType<Prisma.RevealedHintInstancesCreateArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  data: z.union([ RevealedHintInstancesCreateInputSchema,RevealedHintInstancesUncheckedCreateInputSchema ]),
}).strict()

export const RevealedHintInstancesUpsertArgsSchema: z.ZodType<Prisma.RevealedHintInstancesUpsertArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereUniqueInputSchema,
  create: z.union([ RevealedHintInstancesCreateInputSchema,RevealedHintInstancesUncheckedCreateInputSchema ]),
  update: z.union([ RevealedHintInstancesUpdateInputSchema,RevealedHintInstancesUncheckedUpdateInputSchema ]),
}).strict()

export const RevealedHintInstancesCreateManyArgsSchema: z.ZodType<Prisma.RevealedHintInstancesCreateManyArgs> = z.object({
  data: z.union([ RevealedHintInstancesCreateManyInputSchema,RevealedHintInstancesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RevealedHintInstancesDeleteArgsSchema: z.ZodType<Prisma.RevealedHintInstancesDeleteArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  where: RevealedHintInstancesWhereUniqueInputSchema,
}).strict()

export const RevealedHintInstancesUpdateArgsSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateArgs> = z.object({
  select: RevealedHintInstancesSelectSchema.optional(),
  include: RevealedHintInstancesIncludeSchema.optional(),
  data: z.union([ RevealedHintInstancesUpdateInputSchema,RevealedHintInstancesUncheckedUpdateInputSchema ]),
  where: RevealedHintInstancesWhereUniqueInputSchema,
}).strict()

export const RevealedHintInstancesUpdateManyArgsSchema: z.ZodType<Prisma.RevealedHintInstancesUpdateManyArgs> = z.object({
  data: z.union([ RevealedHintInstancesUpdateManyMutationInputSchema,RevealedHintInstancesUncheckedUpdateManyInputSchema ]),
  where: RevealedHintInstancesWhereInputSchema.optional(),
}).strict()

export const RevealedHintInstancesDeleteManyArgsSchema: z.ZodType<Prisma.RevealedHintInstancesDeleteManyArgs> = z.object({
  where: RevealedHintInstancesWhereInputSchema.optional(),
}).strict()

export const PairCreateArgsSchema: z.ZodType<Prisma.PairCreateArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  data: z.union([ PairCreateInputSchema,PairUncheckedCreateInputSchema ]),
}).strict()

export const PairUpsertArgsSchema: z.ZodType<Prisma.PairUpsertArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereUniqueInputSchema,
  create: z.union([ PairCreateInputSchema,PairUncheckedCreateInputSchema ]),
  update: z.union([ PairUpdateInputSchema,PairUncheckedUpdateInputSchema ]),
}).strict()

export const PairCreateManyArgsSchema: z.ZodType<Prisma.PairCreateManyArgs> = z.object({
  data: z.union([ PairCreateManyInputSchema,PairCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PairDeleteArgsSchema: z.ZodType<Prisma.PairDeleteArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  where: PairWhereUniqueInputSchema,
}).strict()

export const PairUpdateArgsSchema: z.ZodType<Prisma.PairUpdateArgs> = z.object({
  select: PairSelectSchema.optional(),
  include: PairIncludeSchema.optional(),
  data: z.union([ PairUpdateInputSchema,PairUncheckedUpdateInputSchema ]),
  where: PairWhereUniqueInputSchema,
}).strict()

export const PairUpdateManyArgsSchema: z.ZodType<Prisma.PairUpdateManyArgs> = z.object({
  data: z.union([ PairUpdateManyMutationInputSchema,PairUncheckedUpdateManyInputSchema ]),
  where: PairWhereInputSchema.optional(),
}).strict()

export const PairDeleteManyArgsSchema: z.ZodType<Prisma.PairDeleteManyArgs> = z.object({
  where: PairWhereInputSchema.optional(),
}).strict()

export const FreshmenDetailsCreateArgsSchema: z.ZodType<Prisma.FreshmenDetailsCreateArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  data: z.union([ FreshmenDetailsCreateInputSchema,FreshmenDetailsUncheckedCreateInputSchema ]),
}).strict()

export const FreshmenDetailsUpsertArgsSchema: z.ZodType<Prisma.FreshmenDetailsUpsertArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereUniqueInputSchema,
  create: z.union([ FreshmenDetailsCreateInputSchema,FreshmenDetailsUncheckedCreateInputSchema ]),
  update: z.union([ FreshmenDetailsUpdateInputSchema,FreshmenDetailsUncheckedUpdateInputSchema ]),
}).strict()

export const FreshmenDetailsCreateManyArgsSchema: z.ZodType<Prisma.FreshmenDetailsCreateManyArgs> = z.object({
  data: z.union([ FreshmenDetailsCreateManyInputSchema,FreshmenDetailsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FreshmenDetailsDeleteArgsSchema: z.ZodType<Prisma.FreshmenDetailsDeleteArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  where: FreshmenDetailsWhereUniqueInputSchema,
}).strict()

export const FreshmenDetailsUpdateArgsSchema: z.ZodType<Prisma.FreshmenDetailsUpdateArgs> = z.object({
  select: FreshmenDetailsSelectSchema.optional(),
  include: FreshmenDetailsIncludeSchema.optional(),
  data: z.union([ FreshmenDetailsUpdateInputSchema,FreshmenDetailsUncheckedUpdateInputSchema ]),
  where: FreshmenDetailsWhereUniqueInputSchema,
}).strict()

export const FreshmenDetailsUpdateManyArgsSchema: z.ZodType<Prisma.FreshmenDetailsUpdateManyArgs> = z.object({
  data: z.union([ FreshmenDetailsUpdateManyMutationInputSchema,FreshmenDetailsUncheckedUpdateManyInputSchema ]),
  where: FreshmenDetailsWhereInputSchema.optional(),
}).strict()

export const FreshmenDetailsDeleteManyArgsSchema: z.ZodType<Prisma.FreshmenDetailsDeleteManyArgs> = z.object({
  where: FreshmenDetailsWhereInputSchema.optional(),
}).strict()

export const HintSlugsCreateArgsSchema: z.ZodType<Prisma.HintSlugsCreateArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  data: z.union([ HintSlugsCreateInputSchema,HintSlugsUncheckedCreateInputSchema ]),
}).strict()

export const HintSlugsUpsertArgsSchema: z.ZodType<Prisma.HintSlugsUpsertArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereUniqueInputSchema,
  create: z.union([ HintSlugsCreateInputSchema,HintSlugsUncheckedCreateInputSchema ]),
  update: z.union([ HintSlugsUpdateInputSchema,HintSlugsUncheckedUpdateInputSchema ]),
}).strict()

export const HintSlugsCreateManyArgsSchema: z.ZodType<Prisma.HintSlugsCreateManyArgs> = z.object({
  data: z.union([ HintSlugsCreateManyInputSchema,HintSlugsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HintSlugsDeleteArgsSchema: z.ZodType<Prisma.HintSlugsDeleteArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  where: HintSlugsWhereUniqueInputSchema,
}).strict()

export const HintSlugsUpdateArgsSchema: z.ZodType<Prisma.HintSlugsUpdateArgs> = z.object({
  select: HintSlugsSelectSchema.optional(),
  include: HintSlugsIncludeSchema.optional(),
  data: z.union([ HintSlugsUpdateInputSchema,HintSlugsUncheckedUpdateInputSchema ]),
  where: HintSlugsWhereUniqueInputSchema,
}).strict()

export const HintSlugsUpdateManyArgsSchema: z.ZodType<Prisma.HintSlugsUpdateManyArgs> = z.object({
  data: z.union([ HintSlugsUpdateManyMutationInputSchema,HintSlugsUncheckedUpdateManyInputSchema ]),
  where: HintSlugsWhereInputSchema.optional(),
}).strict()

export const HintSlugsDeleteManyArgsSchema: z.ZodType<Prisma.HintSlugsDeleteManyArgs> = z.object({
  where: HintSlugsWhereInputSchema.optional(),
}).strict()

export const HintsCreateArgsSchema: z.ZodType<Prisma.HintsCreateArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  data: z.union([ HintsCreateInputSchema,HintsUncheckedCreateInputSchema ]),
}).strict()

export const HintsUpsertArgsSchema: z.ZodType<Prisma.HintsUpsertArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereUniqueInputSchema,
  create: z.union([ HintsCreateInputSchema,HintsUncheckedCreateInputSchema ]),
  update: z.union([ HintsUpdateInputSchema,HintsUncheckedUpdateInputSchema ]),
}).strict()

export const HintsCreateManyArgsSchema: z.ZodType<Prisma.HintsCreateManyArgs> = z.object({
  data: z.union([ HintsCreateManyInputSchema,HintsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HintsDeleteArgsSchema: z.ZodType<Prisma.HintsDeleteArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  where: HintsWhereUniqueInputSchema,
}).strict()

export const HintsUpdateArgsSchema: z.ZodType<Prisma.HintsUpdateArgs> = z.object({
  select: HintsSelectSchema.optional(),
  include: HintsIncludeSchema.optional(),
  data: z.union([ HintsUpdateInputSchema,HintsUncheckedUpdateInputSchema ]),
  where: HintsWhereUniqueInputSchema,
}).strict()

export const HintsUpdateManyArgsSchema: z.ZodType<Prisma.HintsUpdateManyArgs> = z.object({
  data: z.union([ HintsUpdateManyMutationInputSchema,HintsUncheckedUpdateManyInputSchema ]),
  where: HintsWhereInputSchema.optional(),
}).strict()

export const HintsDeleteManyArgsSchema: z.ZodType<Prisma.HintsDeleteManyArgs> = z.object({
  where: HintsWhereInputSchema.optional(),
}).strict()

export const MagicVerseIdentificationInstanceCreateArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  data: z.union([ MagicVerseIdentificationInstanceCreateInputSchema,MagicVerseIdentificationInstanceUncheckedCreateInputSchema ]),
}).strict()

export const MagicVerseIdentificationInstanceUpsertArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpsertArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereUniqueInputSchema,
  create: z.union([ MagicVerseIdentificationInstanceCreateInputSchema,MagicVerseIdentificationInstanceUncheckedCreateInputSchema ]),
  update: z.union([ MagicVerseIdentificationInstanceUpdateInputSchema,MagicVerseIdentificationInstanceUncheckedUpdateInputSchema ]),
}).strict()

export const MagicVerseIdentificationInstanceCreateManyArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceCreateManyArgs> = z.object({
  data: z.union([ MagicVerseIdentificationInstanceCreateManyInputSchema,MagicVerseIdentificationInstanceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MagicVerseIdentificationInstanceDeleteArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceDeleteArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  where: MagicVerseIdentificationInstanceWhereUniqueInputSchema,
}).strict()

export const MagicVerseIdentificationInstanceUpdateArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateArgs> = z.object({
  select: MagicVerseIdentificationInstanceSelectSchema.optional(),
  include: MagicVerseIdentificationInstanceIncludeSchema.optional(),
  data: z.union([ MagicVerseIdentificationInstanceUpdateInputSchema,MagicVerseIdentificationInstanceUncheckedUpdateInputSchema ]),
  where: MagicVerseIdentificationInstanceWhereUniqueInputSchema,
}).strict()

export const MagicVerseIdentificationInstanceUpdateManyArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceUpdateManyArgs> = z.object({
  data: z.union([ MagicVerseIdentificationInstanceUpdateManyMutationInputSchema,MagicVerseIdentificationInstanceUncheckedUpdateManyInputSchema ]),
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
}).strict()

export const MagicVerseIdentificationInstanceDeleteManyArgsSchema: z.ZodType<Prisma.MagicVerseIdentificationInstanceDeleteManyArgs> = z.object({
  where: MagicVerseIdentificationInstanceWhereInputSchema.optional(),
}).strict()

export const StarterMagicVerseCreateArgsSchema: z.ZodType<Prisma.StarterMagicVerseCreateArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  data: z.union([ StarterMagicVerseCreateInputSchema,StarterMagicVerseUncheckedCreateInputSchema ]),
}).strict()

export const StarterMagicVerseUpsertArgsSchema: z.ZodType<Prisma.StarterMagicVerseUpsertArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereUniqueInputSchema,
  create: z.union([ StarterMagicVerseCreateInputSchema,StarterMagicVerseUncheckedCreateInputSchema ]),
  update: z.union([ StarterMagicVerseUpdateInputSchema,StarterMagicVerseUncheckedUpdateInputSchema ]),
}).strict()

export const StarterMagicVerseCreateManyArgsSchema: z.ZodType<Prisma.StarterMagicVerseCreateManyArgs> = z.object({
  data: z.union([ StarterMagicVerseCreateManyInputSchema,StarterMagicVerseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const StarterMagicVerseDeleteArgsSchema: z.ZodType<Prisma.StarterMagicVerseDeleteArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  where: StarterMagicVerseWhereUniqueInputSchema,
}).strict()

export const StarterMagicVerseUpdateArgsSchema: z.ZodType<Prisma.StarterMagicVerseUpdateArgs> = z.object({
  select: StarterMagicVerseSelectSchema.optional(),
  include: StarterMagicVerseIncludeSchema.optional(),
  data: z.union([ StarterMagicVerseUpdateInputSchema,StarterMagicVerseUncheckedUpdateInputSchema ]),
  where: StarterMagicVerseWhereUniqueInputSchema,
}).strict()

export const StarterMagicVerseUpdateManyArgsSchema: z.ZodType<Prisma.StarterMagicVerseUpdateManyArgs> = z.object({
  data: z.union([ StarterMagicVerseUpdateManyMutationInputSchema,StarterMagicVerseUncheckedUpdateManyInputSchema ]),
  where: StarterMagicVerseWhereInputSchema.optional(),
}).strict()

export const StarterMagicVerseDeleteManyArgsSchema: z.ZodType<Prisma.StarterMagicVerseDeleteManyArgs> = z.object({
  where: StarterMagicVerseWhereInputSchema.optional(),
}).strict()

export const MagicVerseCastCreateArgsSchema: z.ZodType<Prisma.MagicVerseCastCreateArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  data: z.union([ MagicVerseCastCreateInputSchema,MagicVerseCastUncheckedCreateInputSchema ]),
}).strict()

export const MagicVerseCastUpsertArgsSchema: z.ZodType<Prisma.MagicVerseCastUpsertArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereUniqueInputSchema,
  create: z.union([ MagicVerseCastCreateInputSchema,MagicVerseCastUncheckedCreateInputSchema ]),
  update: z.union([ MagicVerseCastUpdateInputSchema,MagicVerseCastUncheckedUpdateInputSchema ]),
}).strict()

export const MagicVerseCastCreateManyArgsSchema: z.ZodType<Prisma.MagicVerseCastCreateManyArgs> = z.object({
  data: z.union([ MagicVerseCastCreateManyInputSchema,MagicVerseCastCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MagicVerseCastDeleteArgsSchema: z.ZodType<Prisma.MagicVerseCastDeleteArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  where: MagicVerseCastWhereUniqueInputSchema,
}).strict()

export const MagicVerseCastUpdateArgsSchema: z.ZodType<Prisma.MagicVerseCastUpdateArgs> = z.object({
  select: MagicVerseCastSelectSchema.optional(),
  include: MagicVerseCastIncludeSchema.optional(),
  data: z.union([ MagicVerseCastUpdateInputSchema,MagicVerseCastUncheckedUpdateInputSchema ]),
  where: MagicVerseCastWhereUniqueInputSchema,
}).strict()

export const MagicVerseCastUpdateManyArgsSchema: z.ZodType<Prisma.MagicVerseCastUpdateManyArgs> = z.object({
  data: z.union([ MagicVerseCastUpdateManyMutationInputSchema,MagicVerseCastUncheckedUpdateManyInputSchema ]),
  where: MagicVerseCastWhereInputSchema.optional(),
}).strict()

export const MagicVerseCastDeleteManyArgsSchema: z.ZodType<Prisma.MagicVerseCastDeleteManyArgs> = z.object({
  where: MagicVerseCastWhereInputSchema.optional(),
}).strict()

export const MagicVersesCreateArgsSchema: z.ZodType<Prisma.MagicVersesCreateArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  data: z.union([ MagicVersesCreateInputSchema,MagicVersesUncheckedCreateInputSchema ]),
}).strict()

export const MagicVersesUpsertArgsSchema: z.ZodType<Prisma.MagicVersesUpsertArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereUniqueInputSchema,
  create: z.union([ MagicVersesCreateInputSchema,MagicVersesUncheckedCreateInputSchema ]),
  update: z.union([ MagicVersesUpdateInputSchema,MagicVersesUncheckedUpdateInputSchema ]),
}).strict()

export const MagicVersesCreateManyArgsSchema: z.ZodType<Prisma.MagicVersesCreateManyArgs> = z.object({
  data: z.union([ MagicVersesCreateManyInputSchema,MagicVersesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MagicVersesDeleteArgsSchema: z.ZodType<Prisma.MagicVersesDeleteArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  where: MagicVersesWhereUniqueInputSchema,
}).strict()

export const MagicVersesUpdateArgsSchema: z.ZodType<Prisma.MagicVersesUpdateArgs> = z.object({
  select: MagicVersesSelectSchema.optional(),
  include: MagicVersesIncludeSchema.optional(),
  data: z.union([ MagicVersesUpdateInputSchema,MagicVersesUncheckedUpdateInputSchema ]),
  where: MagicVersesWhereUniqueInputSchema,
}).strict()

export const MagicVersesUpdateManyArgsSchema: z.ZodType<Prisma.MagicVersesUpdateManyArgs> = z.object({
  data: z.union([ MagicVersesUpdateManyMutationInputSchema,MagicVersesUncheckedUpdateManyInputSchema ]),
  where: MagicVersesWhereInputSchema.optional(),
}).strict()

export const MagicVersesDeleteManyArgsSchema: z.ZodType<Prisma.MagicVersesDeleteManyArgs> = z.object({
  where: MagicVersesWhereInputSchema.optional(),
}).strict()

export const SophomoreDetailsCreateArgsSchema: z.ZodType<Prisma.SophomoreDetailsCreateArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  data: z.union([ SophomoreDetailsCreateInputSchema,SophomoreDetailsUncheckedCreateInputSchema ]),
}).strict()

export const SophomoreDetailsUpsertArgsSchema: z.ZodType<Prisma.SophomoreDetailsUpsertArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereUniqueInputSchema,
  create: z.union([ SophomoreDetailsCreateInputSchema,SophomoreDetailsUncheckedCreateInputSchema ]),
  update: z.union([ SophomoreDetailsUpdateInputSchema,SophomoreDetailsUncheckedUpdateInputSchema ]),
}).strict()

export const SophomoreDetailsCreateManyArgsSchema: z.ZodType<Prisma.SophomoreDetailsCreateManyArgs> = z.object({
  data: z.union([ SophomoreDetailsCreateManyInputSchema,SophomoreDetailsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SophomoreDetailsDeleteArgsSchema: z.ZodType<Prisma.SophomoreDetailsDeleteArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  where: SophomoreDetailsWhereUniqueInputSchema,
}).strict()

export const SophomoreDetailsUpdateArgsSchema: z.ZodType<Prisma.SophomoreDetailsUpdateArgs> = z.object({
  select: SophomoreDetailsSelectSchema.optional(),
  include: SophomoreDetailsIncludeSchema.optional(),
  data: z.union([ SophomoreDetailsUpdateInputSchema,SophomoreDetailsUncheckedUpdateInputSchema ]),
  where: SophomoreDetailsWhereUniqueInputSchema,
}).strict()

export const SophomoreDetailsUpdateManyArgsSchema: z.ZodType<Prisma.SophomoreDetailsUpdateManyArgs> = z.object({
  data: z.union([ SophomoreDetailsUpdateManyMutationInputSchema,SophomoreDetailsUncheckedUpdateManyInputSchema ]),
  where: SophomoreDetailsWhereInputSchema.optional(),
}).strict()

export const SophomoreDetailsDeleteManyArgsSchema: z.ZodType<Prisma.SophomoreDetailsDeleteManyArgs> = z.object({
  where: SophomoreDetailsWhereInputSchema.optional(),
}).strict()

export const TodayResinCreateArgsSchema: z.ZodType<Prisma.TodayResinCreateArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  data: z.union([ TodayResinCreateInputSchema,TodayResinUncheckedCreateInputSchema ]),
}).strict()

export const TodayResinUpsertArgsSchema: z.ZodType<Prisma.TodayResinUpsertArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereUniqueInputSchema,
  create: z.union([ TodayResinCreateInputSchema,TodayResinUncheckedCreateInputSchema ]),
  update: z.union([ TodayResinUpdateInputSchema,TodayResinUncheckedUpdateInputSchema ]),
}).strict()

export const TodayResinCreateManyArgsSchema: z.ZodType<Prisma.TodayResinCreateManyArgs> = z.object({
  data: z.union([ TodayResinCreateManyInputSchema,TodayResinCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TodayResinDeleteArgsSchema: z.ZodType<Prisma.TodayResinDeleteArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  where: TodayResinWhereUniqueInputSchema,
}).strict()

export const TodayResinUpdateArgsSchema: z.ZodType<Prisma.TodayResinUpdateArgs> = z.object({
  select: TodayResinSelectSchema.optional(),
  include: TodayResinIncludeSchema.optional(),
  data: z.union([ TodayResinUpdateInputSchema,TodayResinUncheckedUpdateInputSchema ]),
  where: TodayResinWhereUniqueInputSchema,
}).strict()

export const TodayResinUpdateManyArgsSchema: z.ZodType<Prisma.TodayResinUpdateManyArgs> = z.object({
  data: z.union([ TodayResinUpdateManyMutationInputSchema,TodayResinUncheckedUpdateManyInputSchema ]),
  where: TodayResinWhereInputSchema.optional(),
}).strict()

export const TodayResinDeleteManyArgsSchema: z.ZodType<Prisma.TodayResinDeleteManyArgs> = z.object({
  where: TodayResinWhereInputSchema.optional(),
}).strict()