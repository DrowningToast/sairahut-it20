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

export const UserScalarFieldEnumSchema = z.enum(['create_at','update_at','id','name','email','emailVerified','image','type','sophomoreDetailsId','freshmenDetailsId','balance','factionId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const QRInstancesScalarFieldEnumSchema = z.enum(['id','create_at','update_at','scannedById','ownerId']);

export const PasscodeInstancesScalarFieldEnumSchema = z.enum(['id','create_at','update_at','usedById','ownerId']);

export const FactionsScalarFieldEnumSchema = z.enum(['id','name','handler']);

export const FreshmenDetailsScalarFieldEnumSchema = z.enum(['create_at','update_at','id','thisOrThat','thisOrThatReady','scannedQRLeft']);

export const HintSlugsScalarFieldEnumSchema = z.enum(['slug','displayName']);

export const HintsScalarFieldEnumSchema = z.enum(['hintSlugId','content','sophomoreId']);

export const SophomoreDetailsScalarFieldEnumSchema = z.enum(['create_at','update_at','thisOrThat','thisOrThatReady','hintsReady','id','fullname','title','student_id','nickname','branch','participate','many_fresh','facebook_link','instagram_link','phone']);

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
  sophomoreDetailsId: z.string().nullable(),
  freshmenDetailsId: z.string().nullable(),
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
  scannedById: z.string().nullable(),
  ownerId: z.string(),
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
})

export type PasscodeInstances = z.infer<typeof PasscodeInstancesSchema>

/////////////////////////////////////////
// FACTIONS SCHEMA
/////////////////////////////////////////

export const FactionsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  handler: z.string(),
})

export type Factions = z.infer<typeof FactionsSchema>

/////////////////////////////////////////
// FRESHMEN DETAILS SCHEMA
/////////////////////////////////////////

export const FreshmenDetailsSchema = z.object({
  thisOrThat: ThisOrThatSchema.array(),
  create_at: z.coerce.date(),
  update_at: z.coerce.date(),
  id: z.string().cuid(),
  thisOrThatReady: z.boolean(),
  scannedQRLeft: z.number().int(),
})

export type FreshmenDetails = z.infer<typeof FreshmenDetailsSchema>

/////////////////////////////////////////
// HINT SLUGS SCHEMA
/////////////////////////////////////////

export const HintSlugsSchema = z.object({
  slug: z.string(),
  displayName: z.string(),
})

export type HintSlugs = z.infer<typeof HintSlugsSchema>

/////////////////////////////////////////
// HINTS SCHEMA
/////////////////////////////////////////

export const HintsSchema = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string(),
})

export type Hints = z.infer<typeof HintsSchema>

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
  id: z.string().cuid(),
  fullname: z.string(),
  student_id: z.string(),
  nickname: z.string(),
  participate: z.boolean(),
  many_fresh: z.boolean(),
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
})

export type SophomoreDetails = z.infer<typeof SophomoreDetailsSchema>

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
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  sophomoreDetails: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  freshmenDetails: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
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
  sophomoreDetailsId: z.boolean().optional(),
  freshmenDetailsId: z.boolean().optional(),
  balance: z.boolean().optional(),
  factionId: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  sophomoreDetails: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
  freshmenDetails: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
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
  scannedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
}).strict()

export const QRInstancesArgsSchema: z.ZodType<Prisma.QRInstancesArgs> = z.object({
  select: z.lazy(() => QRInstancesSelectSchema).optional(),
  include: z.lazy(() => QRInstancesIncludeSchema).optional(),
}).strict();

export const QRInstancesSelectSchema: z.ZodType<Prisma.QRInstancesSelect> = z.object({
  id: z.boolean().optional(),
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  scannedById: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  scannedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
}).strict()

// PASSCODE INSTANCES
//------------------------------------------------------

export const PasscodeInstancesIncludeSchema: z.ZodType<Prisma.PasscodeInstancesInclude> = z.object({
  usedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
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
  usedBy: z.union([z.boolean(),z.lazy(() => FreshmenDetailsArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
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
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FactionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FRESHMEN DETAILS
//------------------------------------------------------

export const FreshmenDetailsIncludeSchema: z.ZodType<Prisma.FreshmenDetailsInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  usedPasscodes: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  scannedQRs: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
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
  scannedQRs: z.boolean().optional(),
}).strict();

export const FreshmenDetailsSelectSchema: z.ZodType<Prisma.FreshmenDetailsSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  id: z.boolean().optional(),
  thisOrThat: z.boolean().optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  usedPasscodes: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  scannedQRs: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
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
  Hints: z.union([z.boolean(),z.lazy(() => HintsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HintSlugsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HINTS
//------------------------------------------------------

export const HintsIncludeSchema: z.ZodType<Prisma.HintsInclude> = z.object({
  slug: z.union([z.boolean(),z.lazy(() => HintSlugsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
}).strict()

export const HintsArgsSchema: z.ZodType<Prisma.HintsArgs> = z.object({
  select: z.lazy(() => HintsSelectSchema).optional(),
  include: z.lazy(() => HintsIncludeSchema).optional(),
}).strict();

export const HintsSelectSchema: z.ZodType<Prisma.HintsSelect> = z.object({
  hintSlugId: z.boolean().optional(),
  content: z.boolean().optional(),
  sophomoreId: z.boolean().optional(),
  slug: z.union([z.boolean(),z.lazy(() => HintSlugsArgsSchema)]).optional(),
  sophomore: z.union([z.boolean(),z.lazy(() => SophomoreDetailsArgsSchema)]).optional(),
}).strict()

// SOPHOMORE DETAILS
//------------------------------------------------------

export const SophomoreDetailsIncludeSchema: z.ZodType<Prisma.SophomoreDetailsInclude> = z.object({
  hints: z.union([z.boolean(),z.lazy(() => HintsFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  QRInstances: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
  PasscodeInstances: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
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
  QRInstances: z.boolean().optional(),
  PasscodeInstances: z.boolean().optional(),
}).strict();

export const SophomoreDetailsSelectSchema: z.ZodType<Prisma.SophomoreDetailsSelect> = z.object({
  create_at: z.boolean().optional(),
  update_at: z.boolean().optional(),
  thisOrThat: z.boolean().optional(),
  thisOrThatReady: z.boolean().optional(),
  hintsReady: z.boolean().optional(),
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
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  QRInstances: z.union([z.boolean(),z.lazy(() => QRInstancesFindManyArgsSchema)]).optional(),
  PasscodeInstances: z.union([z.boolean(),z.lazy(() => PasscodeInstancesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SophomoreDetailsCountOutputTypeArgsSchema)]).optional(),
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
  sophomoreDetailsId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  factionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  sophomoreDetails: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional().nullable(),
  freshmenDetails: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional().nullable(),
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
  sophomoreDetailsId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  factionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  faction: z.lazy(() => FactionsOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  sophomoreDetailsId: z.string().optional(),
  freshmenDetailsId: z.string().optional()
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
  sophomoreDetailsId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  freshmenDetailsId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  sophomoreDetailsId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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
  scannedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scannedBy: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional().nullable(),
  owner: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
}).strict();

export const QRInstancesOrderByWithRelationInputSchema: z.ZodType<Prisma.QRInstancesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  scannedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const QRInstancesWhereUniqueInputSchema: z.ZodType<Prisma.QRInstancesWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const QRInstancesOrderByWithAggregationInputSchema: z.ZodType<Prisma.QRInstancesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  scannedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QRInstancesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QRInstancesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QRInstancesMinOrderByAggregateInputSchema).optional()
}).strict();

export const QRInstancesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QRInstancesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema),z.lazy(() => QRInstancesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  scannedById: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  usedBy: z.union([ z.lazy(() => FreshmenDetailsRelationFilterSchema),z.lazy(() => FreshmenDetailsWhereInputSchema) ]).optional().nullable(),
  owner: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesOrderByWithRelationInputSchema: z.ZodType<Prisma.PasscodeInstancesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  usedBy: z.lazy(() => FreshmenDetailsOrderByWithRelationInputSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const PasscodeInstancesWhereUniqueInputSchema: z.ZodType<Prisma.PasscodeInstancesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const PasscodeInstancesOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasscodeInstancesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const FactionsWhereInputSchema: z.ZodType<Prisma.FactionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FactionsWhereInputSchema),z.lazy(() => FactionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FactionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FactionsWhereInputSchema),z.lazy(() => FactionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  handler: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const FactionsOrderByWithRelationInputSchema: z.ZodType<Prisma.FactionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FactionsWhereUniqueInputSchema: z.ZodType<Prisma.FactionsWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FactionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FactionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const FreshmenDetailsWhereInputSchema: z.ZodType<Prisma.FreshmenDetailsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FreshmenDetailsWhereInputSchema),z.lazy(() => FreshmenDetailsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FreshmenDetailsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FreshmenDetailsWhereInputSchema),z.lazy(() => FreshmenDetailsWhereInputSchema).array() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  scannedQRLeft: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  usedPasscodes: z.lazy(() => PasscodeInstancesListRelationFilterSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesListRelationFilterSchema).optional()
}).strict();

export const FreshmenDetailsOrderByWithRelationInputSchema: z.ZodType<Prisma.FreshmenDetailsOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesOrderByRelationAggregateInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FreshmenDetailsWhereUniqueInputSchema: z.ZodType<Prisma.FreshmenDetailsWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const FreshmenDetailsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FreshmenDetailsOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional(),
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
  thisOrThat: z.lazy(() => EnumThisOrThatNullableListFilterSchema).optional(),
  thisOrThatReady: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  scannedQRLeft: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const HintSlugsWhereInputSchema: z.ZodType<Prisma.HintSlugsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HintSlugsWhereInputSchema),z.lazy(() => HintSlugsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintSlugsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintSlugsWhereInputSchema),z.lazy(() => HintSlugsWhereInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Hints: z.lazy(() => HintsListRelationFilterSchema).optional()
}).strict();

export const HintSlugsOrderByWithRelationInputSchema: z.ZodType<Prisma.HintSlugsOrderByWithRelationInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  Hints: z.lazy(() => HintsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const HintSlugsWhereUniqueInputSchema: z.ZodType<Prisma.HintSlugsWhereUniqueInput> = z.object({
  slug: z.string().optional()
}).strict();

export const HintSlugsOrderByWithAggregationInputSchema: z.ZodType<Prisma.HintSlugsOrderByWithAggregationInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HintSlugsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HintSlugsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HintSlugsMinOrderByAggregateInputSchema).optional()
}).strict();

export const HintSlugsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HintSlugsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema),z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema),z.lazy(() => HintSlugsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const HintsWhereInputSchema: z.ZodType<Prisma.HintsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HintsWhereInputSchema),z.lazy(() => HintsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HintsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HintsWhereInputSchema),z.lazy(() => HintsWhereInputSchema).array() ]).optional(),
  hintSlugId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sophomoreId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => HintSlugsRelationFilterSchema),z.lazy(() => HintSlugsWhereInputSchema) ]).optional(),
  sophomore: z.union([ z.lazy(() => SophomoreDetailsRelationFilterSchema),z.lazy(() => SophomoreDetailsWhereInputSchema) ]).optional(),
}).strict();

export const HintsOrderByWithRelationInputSchema: z.ZodType<Prisma.HintsOrderByWithRelationInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => HintSlugsOrderByWithRelationInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsOrderByWithRelationInputSchema).optional()
}).strict();

export const HintsWhereUniqueInputSchema: z.ZodType<Prisma.HintsWhereUniqueInput> = z.object({
  hintSlugId_sophomoreId: z.lazy(() => HintsHintSlugIdSophomoreIdCompoundUniqueInputSchema).optional()
}).strict();

export const HintsOrderByWithAggregationInputSchema: z.ZodType<Prisma.HintsOrderByWithAggregationInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional(),
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
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  student_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  participate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  many_fresh: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  instagram_link: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hints: z.lazy(() => HintsListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  QRInstances: z.lazy(() => QRInstancesListRelationFilterSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesListRelationFilterSchema).optional()
}).strict();

export const SophomoreDetailsOrderByWithRelationInputSchema: z.ZodType<Prisma.SophomoreDetailsOrderByWithRelationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
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
  phone: z.lazy(() => SortOrderSchema).optional(),
  hints: z.lazy(() => HintsOrderByRelationAggregateInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesOrderByRelationAggregateInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SophomoreDetailsWhereUniqueInputSchema: z.ZodType<Prisma.SophomoreDetailsWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const SophomoreDetailsOrderByWithAggregationInputSchema: z.ZodType<Prisma.SophomoreDetailsOrderByWithAggregationInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
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
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => EnumNameTitleWithAggregatesFilterSchema),z.lazy(() => NameTitleSchema) ]).optional(),
  student_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nickname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  branch: z.union([ z.lazy(() => EnumBranchWithAggregatesFilterSchema),z.lazy(() => BranchSchema) ]).optional(),
  participate: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  many_fresh: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  facebook_link: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  instagram_link: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
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
  sophomoreDetailsId: z.string().optional().nullable(),
  freshmenDetailsId: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  sophomoreDetailsId: z.string().optional().nullable(),
  freshmenDetailsId: z.string().optional().nullable(),
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  scannedBy: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutScannedQRsInputSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutQRInstancesInputSchema)
}).strict();

export const QRInstancesUncheckedCreateInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  scannedById: z.string().optional().nullable(),
  ownerId: z.string()
}).strict();

export const QRInstancesUpdateInputSchema: z.ZodType<Prisma.QRInstancesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsUpdateOneWithoutScannedQRsNestedInputSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scannedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesCreateManyInputSchema: z.ZodType<Prisma.QRInstancesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  scannedById: z.string().optional().nullable(),
  ownerId: z.string()
}).strict();

export const QRInstancesUpdateManyMutationInputSchema: z.ZodType<Prisma.QRInstancesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scannedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesCreateInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedBy: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInputSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInputSchema)
}).strict();

export const PasscodeInstancesUncheckedCreateInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable(),
  ownerId: z.string()
}).strict();

export const PasscodeInstancesUpdateInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedBy: z.lazy(() => FreshmenDetailsUpdateOneWithoutUsedPasscodesNestedInputSchema).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedUpdateInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesCreateManyInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable(),
  ownerId: z.string()
}).strict();

export const PasscodeInstancesUpdateManyMutationInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FactionsCreateInputSchema: z.ZodType<Prisma.FactionsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  users: z.lazy(() => UserCreateNestedManyWithoutFactionInputSchema).optional()
}).strict();

export const FactionsUncheckedCreateInputSchema: z.ZodType<Prisma.FactionsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutFactionInputSchema).optional()
}).strict();

export const FactionsUpdateInputSchema: z.ZodType<Prisma.FactionsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutFactionNestedInputSchema).optional()
}).strict();

export const FactionsUncheckedUpdateInputSchema: z.ZodType<Prisma.FactionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutFactionNestedInputSchema).optional()
}).strict();

export const FactionsCreateManyInputSchema: z.ZodType<Prisma.FactionsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string()
}).strict();

export const FactionsUpdateManyMutationInputSchema: z.ZodType<Prisma.FactionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FactionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FactionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsCreateInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutFreshmenDetailsInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional()
}).strict();

export const FreshmenDetailsUpdateInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateManyInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateManyInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional()
}).strict();

export const FreshmenDetailsUpdateManyMutationInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateManyMutationInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateManyInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintSlugsCreateInputSchema: z.ZodType<Prisma.HintSlugsCreateInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  Hints: z.lazy(() => HintsCreateNestedManyWithoutSlugInputSchema).optional()
}).strict();

export const HintSlugsUncheckedCreateInputSchema: z.ZodType<Prisma.HintSlugsUncheckedCreateInput> = z.object({
  slug: z.string(),
  displayName: z.string(),
  Hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSlugInputSchema).optional()
}).strict();

export const HintSlugsUpdateInputSchema: z.ZodType<Prisma.HintSlugsUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Hints: z.lazy(() => HintsUpdateManyWithoutSlugNestedInputSchema).optional()
}).strict();

export const HintSlugsUncheckedUpdateInputSchema: z.ZodType<Prisma.HintSlugsUncheckedUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSlugNestedInputSchema).optional()
}).strict();

export const HintSlugsCreateManyInputSchema: z.ZodType<Prisma.HintSlugsCreateManyInput> = z.object({
  slug: z.string(),
  displayName: z.string()
}).strict();

export const HintSlugsUpdateManyMutationInputSchema: z.ZodType<Prisma.HintSlugsUpdateManyMutationInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintSlugsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HintSlugsUncheckedUpdateManyInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsCreateInputSchema: z.ZodType<Prisma.HintsCreateInput> = z.object({
  content: z.string(),
  slug: z.lazy(() => HintSlugsCreateNestedOneWithoutHintsInputSchema),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutHintsInputSchema)
}).strict();

export const HintsUncheckedCreateInputSchema: z.ZodType<Prisma.HintsUncheckedCreateInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string()
}).strict();

export const HintsUpdateInputSchema: z.ZodType<Prisma.HintsUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.lazy(() => HintSlugsUpdateOneRequiredWithoutHintsNestedInputSchema).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsCreateManyInputSchema: z.ZodType<Prisma.HintsCreateManyInput> = z.object({
  hintSlugId: z.string(),
  content: z.string(),
  sophomoreId: z.string()
}).strict();

export const HintsUpdateManyMutationInputSchema: z.ZodType<Prisma.HintsUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateManyInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateInput> = z.object({
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateInput> = z.object({
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateManyInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateManyInput> = z.object({
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
  facebook_link: z.string(),
  instagram_link: z.string(),
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateManyInput> = z.object({
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SophomoreDetailsRelationFilterSchema: z.ZodType<Prisma.SophomoreDetailsRelationFilter> = z.object({
  is: z.lazy(() => SophomoreDetailsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SophomoreDetailsWhereInputSchema).optional().nullable()
}).strict();

export const FreshmenDetailsRelationFilterSchema: z.ZodType<Prisma.FreshmenDetailsRelationFilter> = z.object({
  is: z.lazy(() => FreshmenDetailsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FreshmenDetailsWhereInputSchema).optional().nullable()
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
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
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
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
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
  sophomoreDetailsId: z.lazy(() => SortOrderSchema).optional(),
  freshmenDetailsId: z.lazy(() => SortOrderSchema).optional(),
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

export const QRInstancesCountOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  scannedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  scannedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesMinOrderByAggregateInputSchema: z.ZodType<Prisma.QRInstancesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  scannedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasscodeInstancesCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasscodeInstancesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasscodeInstancesMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  usedById: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
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
  handler: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FactionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FactionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FactionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FactionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  handler: z.lazy(() => SortOrderSchema).optional()
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

export const PasscodeInstancesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasscodeInstancesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QRInstancesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QRInstancesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsAvgOrderByAggregateInput> = z.object({
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsMaxOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsMinOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FreshmenDetailsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FreshmenDetailsSumOrderByAggregateInput> = z.object({
  scannedQRLeft: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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
  displayName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsMaxOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintSlugsMinOrderByAggregateInputSchema: z.ZodType<Prisma.HintSlugsMinOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional()
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
  sophomoreId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HintsMaxOrderByAggregateInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HintsMinOrderByAggregateInputSchema: z.ZodType<Prisma.HintsMinOrderByAggregateInput> = z.object({
  hintSlugId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  sophomoreId: z.lazy(() => SortOrderSchema).optional()
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

export const SophomoreDetailsCountOrderByAggregateInputSchema: z.ZodType<Prisma.SophomoreDetailsCountOrderByAggregateInput> = z.object({
  create_at: z.lazy(() => SortOrderSchema).optional(),
  update_at: z.lazy(() => SortOrderSchema).optional(),
  thisOrThat: z.lazy(() => SortOrderSchema).optional(),
  thisOrThatReady: z.lazy(() => SortOrderSchema).optional(),
  hintsReady: z.lazy(() => SortOrderSchema).optional(),
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

export const FreshmenDetailsCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
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

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
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

export const FreshmenDetailsUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutUserInputSchema) ]).optional(),
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

export const FreshmenDetailsCreateNestedOneWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutScannedQRsInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQRsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQRsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQRsInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutQRInstancesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutQRInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
}).strict();

export const FreshmenDetailsUpdateOneWithoutScannedQRsNestedInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateOneWithoutScannedQRsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQRsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQRsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutScannedQRsInputSchema).optional(),
  upsert: z.lazy(() => FreshmenDetailsUpsertWithoutScannedQRsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutScannedQRsInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutScannedQRsInputSchema) ]).optional(),
}).strict();

export const SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutQRInstancesInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutQRInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutQRInstancesInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInput> = z.object({
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInputSchema).optional(),
  connect: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional()
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

export const SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInputSchema).optional(),
  upsert: z.lazy(() => SophomoreDetailsUpsertWithoutPasscodeInstancesInputSchema).optional(),
  connect: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SophomoreDetailsUpdateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInputSchema) ]).optional(),
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
  createMany: z.lazy(() => QRInstancesCreateManyScannedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedOneWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedOneWithoutFreshmenDetailsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreshmenDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
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
  createMany: z.lazy(() => QRInstancesCreateManyScannedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FreshmenDetailsUpdatethisOrThatInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array().optional(),
  push: z.union([ z.lazy(() => ThisOrThatSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneWithoutFreshmenDetailsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutFreshmenDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreshmenDetailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFreshmenDetailsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
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
  createMany: z.lazy(() => QRInstancesCreateManyScannedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateOneWithoutFreshmenDetailsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateOneWithoutFreshmenDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreshmenDetailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFreshmenDetailsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFreshmenDetailsInputSchema) ]).optional(),
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
  createMany: z.lazy(() => QRInstancesCreateManyScannedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateWithWhereUniqueWithoutScannedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema),z.lazy(() => QRInstancesUpdateManyWithWhereWithoutScannedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
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

export const SophomoreDetailsCreatethisOrThatInputSchema: z.ZodType<Prisma.SophomoreDetailsCreatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array()
}).strict();

export const HintsCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsCreateWithoutSophomoreInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSophomoreDetailsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSophomoreDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const QRInstancesCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QRInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUncheckedCreateNestedManyWithoutSophomoreInput> = z.object({
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsCreateWithoutSophomoreInputSchema).array(),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema),z.lazy(() => HintsCreateOrConnectWithoutSophomoreInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HintsCreateManySophomoreInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HintsWhereUniqueInputSchema),z.lazy(() => HintsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedOneWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedOneWithoutSophomoreDetailsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSophomoreDetailsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => QRInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QRInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QRInstancesWhereUniqueInputSchema),z.lazy(() => QRInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema).array(),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasscodeInstancesCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),z.lazy(() => PasscodeInstancesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SophomoreDetailsUpdatethisOrThatInputSchema: z.ZodType<Prisma.SophomoreDetailsUpdatethisOrThatInput> = z.object({
  set: z.lazy(() => ThisOrThatSchema).array().optional(),
  push: z.union([ z.lazy(() => ThisOrThatSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
}).strict();

export const EnumNameTitleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNameTitleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NameTitleSchema).optional()
}).strict();

export const EnumBranchFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBranchFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BranchSchema).optional()
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

export const UserUpdateOneWithoutSophomoreDetailsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutSophomoreDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSophomoreDetailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSophomoreDetailsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSophomoreDetailsInputSchema) ]).optional(),
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

export const UserUncheckedUpdateOneWithoutSophomoreDetailsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateOneWithoutSophomoreDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSophomoreDetailsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSophomoreDetailsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSophomoreDetailsInputSchema) ]).optional(),
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

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
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
  sophomoreDetailsId: z.string().optional().nullable(),
  freshmenDetailsId: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
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
  sophomoreDetailsId: z.string().optional().nullable(),
  freshmenDetailsId: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional()
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutUserInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FreshmenDetailsCreateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutUserInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutUserInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUserInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FactionsCreateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string()
}).strict();

export const FactionsUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  handler: z.string()
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional()
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
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
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutUserInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional()
}).strict();

export const FactionsUpsertWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => FactionsUpdateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => FactionsCreateWithoutUsersInputSchema),z.lazy(() => FactionsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const FactionsUpdateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FactionsUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.FactionsUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  handler: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FreshmenDetailsCreateWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutScannedQRsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutUsedByInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutScannedQRsInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutFreshmenDetailsInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutUsedByInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutScannedQRsInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQRsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQRsInputSchema) ]),
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutQRInstancesInput> = z.object({
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutQRInstancesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutQRInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutQRInstancesInputSchema) ]),
}).strict();

export const FreshmenDetailsUpsertWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsUpsertWithoutScannedQRsInput> = z.object({
  update: z.union([ z.lazy(() => FreshmenDetailsUpdateWithoutScannedQRsInputSchema),z.lazy(() => FreshmenDetailsUncheckedUpdateWithoutScannedQRsInputSchema) ]),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutScannedQRsInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutScannedQRsInputSchema) ]),
}).strict();

export const FreshmenDetailsUpdateWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsUpdateWithoutScannedQRsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUpdateManyWithoutUsedByNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutScannedQRsInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutScannedQRsInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutFreshmenDetailsNestedInputSchema).optional(),
  usedPasscodes: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional()
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutQRInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutQRInstancesInput> = z.object({
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateWithoutUsedPasscodesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFreshmenDetailsInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesCreateNestedManyWithoutScannedByInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsCreatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.boolean().optional(),
  scannedQRLeft: z.number().int().optional(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutFreshmenDetailsInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutScannedByInputSchema).optional()
}).strict();

export const FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsCreateOrConnectWithoutUsedPasscodesInput> = z.object({
  where: z.lazy(() => FreshmenDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FreshmenDetailsCreateWithoutUsedPasscodesInputSchema),z.lazy(() => FreshmenDetailsUncheckedCreateWithoutUsedPasscodesInputSchema) ]),
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsCreateNestedManyWithoutSophomoreInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInput> = z.object({
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  hints: z.lazy(() => HintsUncheckedCreateNestedManyWithoutSophomoreInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutPasscodeInstancesInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutPasscodeInstancesInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutPasscodeInstancesInputSchema) ]),
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
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutFreshmenDetailsNestedInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUpdateManyWithoutScannedByNestedInputSchema).optional()
}).strict();

export const FreshmenDetailsUncheckedUpdateWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.FreshmenDetailsUncheckedUpdateWithoutUsedPasscodesInput> = z.object({
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thisOrThat: z.union([ z.lazy(() => FreshmenDetailsUpdatethisOrThatInputSchema),z.lazy(() => ThisOrThatSchema).array() ]).optional(),
  thisOrThatReady: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  scannedQRLeft: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutFreshmenDetailsNestedInputSchema).optional(),
  scannedQRs: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedByNestedInputSchema).optional()
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutPasscodeInstancesInput> = z.object({
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hints: z.lazy(() => HintsUncheckedUpdateManyWithoutSophomoreNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
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
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional()
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
  sophomoreDetailsId: z.string().optional().nullable(),
  freshmenDetailsId: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  sophomoreDetailsId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  factionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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
  sophomoreDetailsId: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFreshmenDetailsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFreshmenDetailsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFreshmenDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFreshmenDetailsInputSchema) ]),
}).strict();

export const PasscodeInstancesCreateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateWithoutUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutPasscodeInstancesInputSchema)
}).strict();

export const PasscodeInstancesUncheckedCreateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateWithoutUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string()
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
  owner: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutQRInstancesInputSchema)
}).strict();

export const QRInstancesUncheckedCreateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateWithoutScannedByInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string()
}).strict();

export const QRInstancesCreateOrConnectWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesCreateOrConnectWithoutScannedByInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutScannedByInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutScannedByInputSchema) ]),
}).strict();

export const QRInstancesCreateManyScannedByInputEnvelopeSchema: z.ZodType<Prisma.QRInstancesCreateManyScannedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QRInstancesCreateManyScannedByInputSchema),z.lazy(() => QRInstancesCreateManyScannedByInputSchema).array() ]),
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  data: z.union([ z.lazy(() => QRInstancesUpdateManyMutationInputSchema),z.lazy(() => QRInstancesUncheckedUpdateManyWithoutScannedQRsInputSchema) ]),
}).strict();

export const QRInstancesScalarWhereInputSchema: z.ZodType<Prisma.QRInstancesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QRInstancesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QRInstancesScalarWhereInputSchema),z.lazy(() => QRInstancesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  create_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  update_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scannedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const HintsCreateWithoutSlugInputSchema: z.ZodType<Prisma.HintsCreateWithoutSlugInput> = z.object({
  content: z.string(),
  sophomore: z.lazy(() => SophomoreDetailsCreateNestedOneWithoutHintsInputSchema)
}).strict();

export const HintsUncheckedCreateWithoutSlugInputSchema: z.ZodType<Prisma.HintsUncheckedCreateWithoutSlugInput> = z.object({
  content: z.string(),
  sophomoreId: z.string()
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
}).strict();

export const HintSlugsCreateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsCreateWithoutHintsInput> = z.object({
  slug: z.string(),
  displayName: z.string()
}).strict();

export const HintSlugsUncheckedCreateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUncheckedCreateWithoutHintsInput> = z.object({
  slug: z.string(),
  displayName: z.string()
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesCreateNestedManyWithoutOwnerInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedCreateWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedCreateWithoutHintsInput> = z.object({
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
  facebook_link: z.string(),
  instagram_link: z.string(),
  phone: z.string(),
  User: z.lazy(() => UserUncheckedCreateNestedOneWithoutSophomoreDetailsInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const SophomoreDetailsCreateOrConnectWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsCreateOrConnectWithoutHintsInput> = z.object({
  where: z.lazy(() => SophomoreDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SophomoreDetailsCreateWithoutHintsInputSchema),z.lazy(() => SophomoreDetailsUncheckedCreateWithoutHintsInputSchema) ]),
}).strict();

export const HintSlugsUpsertWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUpsertWithoutHintsInput> = z.object({
  update: z.union([ z.lazy(() => HintSlugsUpdateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedUpdateWithoutHintsInputSchema) ]),
  create: z.union([ z.lazy(() => HintSlugsCreateWithoutHintsInputSchema),z.lazy(() => HintSlugsUncheckedCreateWithoutHintsInputSchema) ]),
}).strict();

export const HintSlugsUpdateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUpdateWithoutHintsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintSlugsUncheckedUpdateWithoutHintsInputSchema: z.ZodType<Prisma.HintSlugsUncheckedUpdateWithoutHintsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUpdateManyWithoutOwnerNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const SophomoreDetailsUncheckedUpdateWithoutHintsInputSchema: z.ZodType<Prisma.SophomoreDetailsUncheckedUpdateWithoutHintsInput> = z.object({
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
  facebook_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instagram_link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateOneWithoutSophomoreDetailsNestedInputSchema).optional(),
  QRInstances: z.lazy(() => QRInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  PasscodeInstances: z.lazy(() => PasscodeInstancesUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const HintsCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsCreateWithoutSophomoreInput> = z.object({
  content: z.string(),
  slug: z.lazy(() => HintSlugsCreateNestedOneWithoutHintsInputSchema)
}).strict();

export const HintsUncheckedCreateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUncheckedCreateWithoutSophomoreInput> = z.object({
  hintSlugId: z.string(),
  content: z.string()
}).strict();

export const HintsCreateOrConnectWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsCreateOrConnectWithoutSophomoreInput> = z.object({
  where: z.lazy(() => HintsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HintsCreateWithoutSophomoreInputSchema),z.lazy(() => HintsUncheckedCreateWithoutSophomoreInputSchema) ]),
}).strict();

export const HintsCreateManySophomoreInputEnvelopeSchema: z.ZodType<Prisma.HintsCreateManySophomoreInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HintsCreateManySophomoreInputSchema),z.lazy(() => HintsCreateManySophomoreInputSchema).array() ]),
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
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUserInputSchema).optional(),
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
  freshmenDetailsId: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  factionId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSophomoreDetailsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSophomoreDetailsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSophomoreDetailsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSophomoreDetailsInputSchema) ]),
}).strict();

export const QRInstancesCreateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateWithoutOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  scannedBy: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutScannedQRsInputSchema).optional()
}).strict();

export const QRInstancesUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  scannedById: z.string().optional().nullable()
}).strict();

export const QRInstancesCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => QRInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QRInstancesCreateWithoutOwnerInputSchema),z.lazy(() => QRInstancesUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const QRInstancesCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.QRInstancesCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QRInstancesCreateManyOwnerInputSchema),z.lazy(() => QRInstancesCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasscodeInstancesCreateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedBy: z.lazy(() => FreshmenDetailsCreateNestedOneWithoutUsedPasscodesInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable()
}).strict();

export const PasscodeInstancesCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => PasscodeInstancesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasscodeInstancesCreateWithoutOwnerInputSchema),z.lazy(() => PasscodeInstancesUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const PasscodeInstancesCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PasscodeInstancesCreateManyOwnerInputSchema),z.lazy(() => PasscodeInstancesCreateManyOwnerInputSchema).array() ]),
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
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
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
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  factionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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

export const UserCreateManyFactionInputSchema: z.ZodType<Prisma.UserCreateManyFactionInput> = z.object({
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => PlayerTypeSchema).optional(),
  sophomoreDetailsId: z.string().optional().nullable(),
  freshmenDetailsId: z.string().optional().nullable(),
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
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  sophomoreDetails: z.lazy(() => SophomoreDetailsUpdateOneWithoutUserNestedInputSchema).optional(),
  freshmenDetails: z.lazy(() => FreshmenDetailsUpdateOneWithoutUserNestedInputSchema).optional()
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  sophomoreDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  freshmenDetailsId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesCreateManyUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyUsedByInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string()
}).strict();

export const QRInstancesCreateManyScannedByInputSchema: z.ZodType<Prisma.QRInstancesCreateManyScannedByInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  ownerId: z.string()
}).strict();

export const PasscodeInstancesUpdateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateWithoutUsedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutPasscodeInstancesNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedUpdateWithoutUsedByInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateWithoutUsedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyWithoutUsedPasscodesInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyWithoutUsedPasscodesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUpdateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUpdateWithoutScannedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutQRInstancesNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateWithoutScannedByInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateWithoutScannedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUncheckedUpdateManyWithoutScannedQRsInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyWithoutScannedQRsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsCreateManySlugInputSchema: z.ZodType<Prisma.HintsCreateManySlugInput> = z.object({
  content: z.string(),
  sophomoreId: z.string()
}).strict();

export const HintsUpdateWithoutSlugInputSchema: z.ZodType<Prisma.HintsUpdateWithoutSlugInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomore: z.lazy(() => SophomoreDetailsUpdateOneRequiredWithoutHintsNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateWithoutSlugInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateWithoutSlugInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsUncheckedUpdateManyWithoutHintsInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateManyWithoutHintsInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sophomoreId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HintsCreateManySophomoreInputSchema: z.ZodType<Prisma.HintsCreateManySophomoreInput> = z.object({
  hintSlugId: z.string(),
  content: z.string()
}).strict();

export const QRInstancesCreateManyOwnerInputSchema: z.ZodType<Prisma.QRInstancesCreateManyOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  scannedById: z.string().optional().nullable()
}).strict();

export const PasscodeInstancesCreateManyOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesCreateManyOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  create_at: z.coerce.date().optional(),
  update_at: z.coerce.date().optional(),
  usedById: z.string().optional().nullable()
}).strict();

export const HintsUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUpdateWithoutSophomoreInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.lazy(() => HintSlugsUpdateOneRequiredWithoutHintsNestedInputSchema).optional()
}).strict();

export const HintsUncheckedUpdateWithoutSophomoreInputSchema: z.ZodType<Prisma.HintsUncheckedUpdateWithoutSophomoreInput> = z.object({
  hintSlugId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QRInstancesUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scannedBy: z.lazy(() => FreshmenDetailsUpdateOneWithoutScannedQRsNestedInputSchema).optional()
}).strict();

export const QRInstancesUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scannedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const QRInstancesUncheckedUpdateManyWithoutQRInstancesInputSchema: z.ZodType<Prisma.QRInstancesUncheckedUpdateManyWithoutQRInstancesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scannedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasscodeInstancesUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedBy: z.lazy(() => FreshmenDetailsUpdateOneWithoutUsedPasscodesNestedInputSchema).optional()
}).strict();

export const PasscodeInstancesUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasscodeInstancesUncheckedUpdateManyWithoutPasscodeInstancesInputSchema: z.ZodType<Prisma.PasscodeInstancesUncheckedUpdateManyWithoutPasscodeInstancesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  create_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  update_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  usedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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