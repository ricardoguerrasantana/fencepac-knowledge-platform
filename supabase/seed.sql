insert into public.product_types
(slug, name, category, system_type, short_description, typical_use, key_components, installation_basics, qa_checks, common_risks, source_status, hero_image_path)
values
(
  'concrete-crib-walls',
  'Concrete Crib Retaining Walls',
  'Gravity retaining walls',
  'Interlocking precast concrete crib gravity wall',
  'A gravity retaining wall system made from interlocking precast concrete crib components filled with free-draining material.',
  'Civil, commercial, road, rail, landscaping and embankment retaining applications where a permeable gravity wall is suitable.',
  array['Headers', 'Stretchers', 'Back stretchers', 'Closers', 'Spacer blocks', 'Taper units', 'Free-draining granular infill', 'Geotextile separation layer', 'Ag pipe drainage'],
  array['Set out wall alignment and levels', 'Prepare foundation/footing as designed', 'Place first stretcher/back stretcher into wet footing where required', 'Install crib components course by course', 'Place free-draining granular material', 'Install geotextile and ag pipe drainage as specified'],
  array['Check wall set-out', 'Check foundation bearing assumptions', 'Check drainage outlet falls', 'Check correct crib component type', 'Check geotextile separation layer', 'Check backfill/infill placement'],
  array['Poor drainage causing hydrostatic pressure', 'Incorrect component placement', 'Insufficient bearing capacity', 'Missing geotextile', 'Blocked or flat ag pipe', 'Using generic details without engineer review'],
  'needs_review',
  '/images/wall-systems/concrete-crib-walls.svg'
),
(
  'cut-sandstone-gravity-walls',
  'Cut Sandstone Gravity Walls',
  'Gravity retaining walls',
  'Natural stone block gravity wall',
  'A gravity wall system using large cut sandstone blocks where wall mass and block placement resist retained soil pressure.',
  'Architectural, landscape and civil retaining applications where natural stone appearance is required.',
  array['Cut sandstone blocks', 'Foundation/base preparation', 'Drainage material', 'Geotextile', 'Ag pipe where specified'],
  array['Prepare stable foundation', 'Place sandstone blocks to line and level', 'Maintain appropriate batter/setback where designed', 'Provide drainage behind wall', 'Backfill progressively'],
  array['Check block quality and size', 'Check foundation condition', 'Check wall alignment', 'Check drainage behind wall', 'Check no unsupported excavation remains behind wall'],
  array['Inadequate foundation', 'No drainage', 'Blocks not seated properly', 'Uncontrolled surcharge near crest', 'Assuming visual wall is structurally suitable without design'],
  'needs_review',
  '/images/wall-systems/cut-sandstone-gravity-walls.svg'
),
(
  'segmental-block-retaining-walls',
  'Segmental Block Retaining Walls',
  'Segmental retaining walls',
  'Dry-stacked interlocking concrete block wall, gravity or reinforced',
  'A modular retaining wall type using dry-stacked interlocking concrete blocks, often with pins, caps, drainage, and geogrid when reinforced.',
  'Residential, commercial and civil walls where modular block appearance and efficient installation are required.',
  array['Segmental blocks', 'Pins or connectors', 'Caps', 'Geogrid where designed', 'Levelling pad', 'Drainage aggregate', 'Ag pipe', 'Compacted backfill'],
  array['Excavate and prepare base', 'Install compacted levelling pad', 'Place first course accurately', 'Install drainage aggregate and ag pipe', 'Install geogrid layers where specified', 'Backfill and compact in layers', 'Install caps/finish'],
  array['Check first course level', 'Check geogrid type/length/orientation', 'Check drainage layer', 'Check compaction', 'Check setback/batter', 'Check surcharge limits near crest'],
  array['Poor first course alignment', 'Wrong geogrid or missing geogrid', 'Inadequate compaction', 'No drainage outlet', 'Using brand brochure instead of project design'],
  'needs_review',
  '/images/wall-systems/segmental-block-retaining-walls.svg'
),
(
  'large-format-concrete-block-walls',
  'Large Format Concrete Block Retaining Walls',
  'Large block retaining walls',
  'Large precast concrete block wall, gravity or reinforced',
  'A retaining wall type using large precast concrete blocks that may work as a gravity wall or be combined with extenders, geogrid, steel grid, or other reinforcement depending on design.',
  'Large civil, commercial, industrial and infrastructure retaining walls needing fast installation and robust block units.',
  array['Large concrete blocks', 'Hollow cores', 'Connectors', 'Extenders or reinforcement where designed', 'Drainage aggregate', 'Backfill', 'Capping/finishing units'],
  array['Prepare foundation', 'Place large blocks using suitable lifting method', 'Maintain alignment and batter', 'Install extenders/geogrid/reinforcement where specified', 'Provide drainage', 'Backfill and compact progressively'],
  array['Check lifting method', 'Check block orientation', 'Check reinforcement connection', 'Check drainage path', 'Check design detail for gravity vs reinforced wall'],
  array['Incorrect lifting/handling', 'Misunderstanding gravity vs reinforced design', 'Poor connection to reinforcement', 'Inadequate drainage', 'Uncontrolled surcharge'],
  'needs_review',
  '/images/wall-systems/large-format-concrete-block-walls.svg'
),
(
  'gabion-gravity-walls',
  'Gabion Gravity Walls',
  'Gabion retaining walls',
  'Rock-filled wire basket gravity wall',
  'A flexible, permeable gravity retaining wall type made from wire mesh baskets filled with rock.',
  'Retaining, erosion control, drainage-friendly walls, creek/channel works, revetments and landscape/civil applications.',
  array['Gabion baskets', 'Double-twisted wire mesh', 'Lacing wire or C-rings', 'Rock fill', 'Bracing', 'Foundation preparation', 'Geotextile where specified'],
  array['Prepare foundation', 'Assemble baskets', 'Connect adjacent baskets', 'Brace visible faces', 'Place rock carefully on visible faces', 'Fill baskets', 'Close lids and lace/C-ring securely'],
  array['Check basket alignment', 'Check wire coating/specification', 'Check rock size and quality', 'Check visible face hand placement', 'Check connections between baskets', 'Check settlement/drainage conditions'],
  array['Poor rock placement causing bulging', 'Incorrect lacing', 'Damaged coating', 'Undersized rock', 'Weak foundation', 'Assuming all gabions are reinforced earth walls'],
  'needs_review',
  '/images/wall-systems/gabion-gravity-walls.svg'
),
(
  'gabion-faced-mse-walls',
  'Gabion-Faced MSE Walls',
  'Mechanically Stabilised Earth walls',
  'Gabion-faced reinforced soil wall',
  'A reinforced soil wall using geogrid or mesh reinforcement with a gabion or rock-faced front face.',
  'Road, rail, mining, infrastructure and steep retaining applications requiring reinforced backfill and a rock-face finish.',
  array['Gabion facing', 'Geogrid or mesh reinforcement', 'Structural backfill', 'Compaction layers', 'Connections', 'Drainage', 'Rock fill'],
  array['Prepare foundation', 'Install facing units', 'Connect reinforcement to facing', 'Place and compact structural backfill', 'Repeat in layers', 'Maintain face alignment and drainage'],
  array['Check reinforcement type and length', 'Check connection details', 'Check structural backfill quality', 'Check compaction testing', 'Check face angle/alignment', 'Check drainage details'],
  array['Confusing gabion gravity wall with MSE wall', 'Wrong reinforcement length', 'Poor connection capacity', 'Unsuitable backfill', 'Inadequate compaction', 'Missing hold points'],
  'needs_review',
  '/images/wall-systems/gabion-faced-mse-walls.svg'
),
(
  'vegetated-reinforced-soil-slopes',
  'Vegetated Reinforced Soil Slopes',
  'Reinforced soil slopes',
  'Vegetated RSS with mesh/erosion-control facing',
  'A reinforced soil slope system with an inclined vegetated face, erosion-control lining, and reinforcement extending into compacted backfill.',
  'Road, rail, embankment, slip repair and landscape-sensitive slope stabilisation where vegetation finish is desired.',
  array['Wire mesh facing', 'Integrated tail or reinforcement', 'Erosion control blanket', 'Geogrid where specified', 'Structural backfill', 'Compaction', 'Vegetation layer'],
  array['Prepare foundation and slope geometry', 'Install facing mesh and bracing', 'Install erosion control blanket', 'Place reinforcement/tail', 'Place and compact backfill layers', 'Establish vegetation'],
  array['Check slope angle', 'Check erosion blanket placement', 'Check reinforcement/tail length', 'Check compaction', 'Check drainage and erosion risk', 'Check vegetation establishment requirements'],
  array['Erosion before vegetation establishes', 'Wrong face angle', 'Poor compaction near face', 'Incorrect reinforcement placement', 'Water concentration at crest'],
  'needs_review',
  '/images/wall-systems/vegetated-reinforced-soil-slopes.svg'
),
(
  'rock-faced-mse-rss-walls',
  'Rock-Faced MSE / RSS Walls',
  'Mechanically Stabilised Earth walls',
  'Rock-faced reinforced soil wall or slope',
  'A reinforced soil wall or steep slope with an angled rock-filled mesh face and reinforcement extending into compacted structural backfill.',
  'Infrastructure retaining walls, steep slopes, bridge approaches, slip repair and areas needing a durable rock-face finish.',
  array['Rock-faced mesh units', 'Integrated mesh tail', 'Geogrid reinforcement', 'Rock fill', 'Structural backfill', 'Compaction layers', 'Drainage'],
  array['Prepare foundation', 'Set facing units to designed angle', 'Place rock facing', 'Install reinforcement layers', 'Place and compact backfill', 'Maintain face alignment and drainage'],
  array['Check face angle', 'Check reinforcement length/type', 'Check rock fill quality', 'Check compaction testing', 'Check drainage', 'Check connection/tail placement'],
  array['Wrong face angle', 'Poor rock facing placement', 'Incorrect reinforcement overlap or length', 'Unsuitable backfill', 'Insufficient compaction near face'],
  'needs_review',
  '/images/wall-systems/rock-faced-mse-rss-walls.svg'
),
(
  'geogrid-reinforced-soil-slopes',
  'Geogrid Reinforced Soil Slopes',
  'Reinforced soil slopes',
  'Geogrid reinforced slope or embankment',
  'A slope stabilisation system using layers of geogrid reinforcement within compacted structural fill to improve stability.',
  'Slip repair, embankment construction, road widening, steep slopes and reinforced earthworks.',
  array['Geogrid', 'Structural backfill', 'Facing treatment', 'Compaction layers', 'Drainage', 'Toe support where designed'],
  array['Prepare foundation and toe conditions', 'Place geogrid to correct orientation and length', 'Place backfill', 'Compact in layers', 'Install facing/erosion protection', 'Repeat to design height'],
  array['Check geogrid product and strength', 'Check roll direction/orientation', 'Check overlap and anchorage', 'Check compaction', 'Check fill quality', 'Check drainage and toe support'],
  array['Wrong geogrid orientation', 'Damaged geogrid', 'Poor compaction', 'Unsuitable fill', 'No control of water', 'Missing geotechnical inspection'],
  'needs_review',
  '/images/wall-systems/geogrid-reinforced-soil-slopes.svg'
),
(
  'concrete-panel-mse-walls',
  'Concrete Panel MSE Walls',
  'Mechanically Stabilised Earth walls',
  'Concrete panel reinforced earth wall',
  'A reinforced earth wall using modular concrete facing panels connected to steel or geosynthetic soil reinforcement in engineered backfill.',
  'Road, bridge, rail, commercial and infrastructure retaining walls carrying high loads or requiring a formal panel finish.',
  array['Precast concrete facing panels', 'Soil reinforcement', 'Select backfill', 'Bearing pads', 'Levelling pad', 'Drainage layer', 'Connection hardware'],
  array['Install levelling pad', 'Place facing panels', 'Connect reinforcement', 'Place and compact select backfill in layers', 'Maintain panel alignment', 'Install drainage and finishing details'],
  array['Check panel alignment', 'Check reinforcement connection', 'Check backfill quality', 'Check compaction results', 'Check drainage layer', 'Check panel damage and bearing pads'],
  array['Panel misalignment', 'Poor backfill compaction', 'Incorrect reinforcement connection', 'Unsuitable fill', 'Water build-up', 'Damage to panels during handling'],
  'needs_review',
  '/images/wall-systems/concrete-panel-mse-walls.svg'
),
(
  'concrete-sleeper-walls',
  'Concrete Sleeper Retaining Walls',
  'Sleeper retaining walls',
  'Vertical cantilever post-and-panel retaining wall',
  'A retaining wall type using concrete sleeper panels spanning between embedded steel posts acting as a vertical cantilever system.',
  'Residential, commercial and civil retaining walls where vertical face and simple post-and-panel installation are suitable.',
  array['Concrete sleeper panels', 'Steel posts', 'Concrete footings/piers', 'Ag pipe', 'Drainage aggregate', 'Geotextile', 'Backfill'],
  array['Set out post locations', 'Excavate post holes', 'Install posts with designed embedment and lean-back', 'Concrete posts in place', 'Install sleeper panels', 'Install drainage and backfill progressively'],
  array['Check post spacing', 'Check embedment depth', 'Check concrete grade/cover where specified', 'Check lean-back', 'Check drainage outlet', 'Check sleeper condition'],
  array['Insufficient post embedment', 'No drainage behind wall', 'Wrong post spacing', 'Poor concrete around posts', 'Wall loaded beyond design', 'Assuming sleeper walls address global slip risk'],
  'needs_review',
  '/images/wall-systems/concrete-sleeper-walls.svg'
)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  system_type = excluded.system_type,
  short_description = excluded.short_description,
  typical_use = excluded.typical_use,
  key_components = excluded.key_components,
  installation_basics = excluded.installation_basics,
  qa_checks = excluded.qa_checks,
  common_risks = excluded.common_risks,
  source_status = excluded.source_status,
  hero_image_path = excluded.hero_image_path;

insert into public.sources
(slug, title, source_type, source_owner, supplier, url, local_file_name, status, notes, is_confidential)
values
('fencepac-retaining-webpage', 'Fencepac retaining webpage', 'web', 'Fencepac', 'Fencepac', 'https://fencepac.com.au/retaining/', null, 'company_source', 'Company webpage used as a source reference for retaining wall categories.', false),
('concrete-crib-units-pdf', 'Concrete Crib Units', 'pdf', 'Fencepac / supplier source', 'Concrib', null, '02. Concrete Crib Units(1).pdf', 'needs_review', 'Initial PDF source for crib components.', false),
('crib-single-construction-pdf', 'Crib Single Construction', 'pdf', 'Fencepac / supplier source', 'Concrib', null, '03. Crib Single Construction(1).pdf', 'needs_review', 'Initial PDF source for single construction crib wall details.', false),
('crib-double-construction-pdf', 'Crib Double Construction', 'pdf', 'Fencepac / supplier source', 'Concrib', null, '04. Crib Double Construction(1).pdf', 'needs_review', 'Initial PDF source for double construction crib wall details.', false),
('crib-triple-construction-pdf', 'Crib Triple Construction', 'pdf', 'Fencepac / supplier source', 'Concrib', null, '05. Crib Triple Construction(1).pdf', 'needs_review', 'Initial PDF source for triple construction crib wall details.', false),
('national-masonry-retaining-webpage', 'National Masonry retaining walls webpage', 'web', 'National Masonry', 'National Masonry', 'https://www.nationalmasonry.com.au/blocks-bricks-pavers-retaining-walls-qld-nsw/retaining_walls/', null, 'external_reference', 'Supplier reference for segmental block retaining walls.', false),
('keystone-133-elite-brochure', 'Keystone 133 Elite product guide', 'pdf', 'National Masonry', 'National Masonry', null, '08. National-Masonry-SQLD-NSW-Brochure-Keystone-133Elite(1).pdf', 'external_reference', 'Brand example under Segmental Block Retaining Walls, not a top-level product type.', false),
('magnumstone-brochure', 'MagnumStone brochure', 'pdf', 'Cirtex', 'Cirtex / MagnumStone', null, '06. Magnum Stone Brochure_compressed(1).pdf', 'external_reference', 'Brand example under Large Format Concrete Block Retaining Walls.', false),
('maccaferri-gabions-webpage', 'Maccaferri gabions webpage', 'web', 'Maccaferri', 'Maccaferri', 'https://www.maccaferri.com/products/gabions/', null, 'external_reference', 'Supplier reference for gabion wall systems.', false),
('gabion-gravity-walls-pdf', 'Gabion Gravity Walls', 'pdf', 'Geofabrics', 'Geofabrics', null, '09. Gabion Gravity Walls(1).pdf', 'external_reference', 'Source for gabion gravity wall topic.', false),
('gabion-reinforced-earth-walls-pdf', 'Gabion Reinforced Earth Walls', 'pdf', 'Geofabrics', 'Geofabrics', null, '10. Gabion Reinforced Earth Walls(1).pdf', 'external_reference', 'Source for gabion-faced MSE wall topic.', false),
('terramesh-natural-pdf', 'Terra Mesh Walls Natural', 'pdf', 'Geofabrics', 'Geofabrics', null, '11. Terra Mesh Walls Natural(1).pdf', 'external_reference', 'Source for vegetated reinforced soil slope topic.', false),
('terramesh-rock-faced-pdf', 'Terra Mesh Walls Rock Faced', 'pdf', 'Geofabrics', 'Geofabrics', null, '12. Terra Mesh Walls Rock Faced(1).pdf', 'external_reference', 'Source for rock-faced MSE/RSS topic.', false),
('geogrid-reinforced-earth-slopes-pdf', 'Geogrid Reinforced Earth Slopes', 'pdf', 'Geofabrics', 'Geofabrics', null, '14. Geogrid Reinforced Earth Slopes(1).pdf', 'external_reference', 'Source for geogrid reinforced soil slope topic.', false),
('concrete-panel-walls-pdf', 'Concrete Panel Walls', 'pdf', 'Reinforced Earth / supplier source', null, null, '15. Concrete Panel Walls(1).pdf', 'external_reference', 'Source for concrete panel MSE wall topic.', false),
('concrete-sleeper-wall-section-pdf', 'Concrete Sleeper Wall Section', 'pdf', 'Fencepac / supplier source', 'Concrib', null, '16. Concrete Sleeper Wall Section(1).pdf', 'needs_review', 'Source for concrete sleeper wall topic.', false),
('cut-sandstone-wall-image', 'Cut sandstone wall photo', 'image', 'Fencepac / project photo', null, null, '07. Cut Sand Stone Wall(1).webp', 'needs_review', 'Image reference for cut sandstone gravity wall topic.', false)
on conflict (slug) do update set
  title = excluded.title,
  source_type = excluded.source_type,
  source_owner = excluded.source_owner,
  supplier = excluded.supplier,
  url = excluded.url,
  local_file_name = excluded.local_file_name,
  status = excluded.status,
  notes = excluded.notes,
  is_confidential = excluded.is_confidential;

insert into public.product_sources (product_type_id, source_id, relationship_type, note)
select p.id, s.id, x.relationship_type, x.note
from (
  values
  ('concrete-crib-walls', 'fencepac-retaining-webpage', 'primary', 'Fencepac retaining page reference.'),
  ('concrete-crib-walls', 'concrete-crib-units-pdf', 'manual', 'Crib component source.'),
  ('concrete-crib-walls', 'crib-single-construction-pdf', 'manual', 'Single construction detail.'),
  ('concrete-crib-walls', 'crib-double-construction-pdf', 'manual', 'Double construction detail.'),
  ('concrete-crib-walls', 'crib-triple-construction-pdf', 'manual', 'Triple construction detail.'),
  ('cut-sandstone-gravity-walls', 'cut-sandstone-wall-image', 'image_example', 'Photo/example reference.'),
  ('segmental-block-retaining-walls', 'national-masonry-retaining-webpage', 'supplier_example', 'Supplier/category reference.'),
  ('segmental-block-retaining-walls', 'keystone-133-elite-brochure', 'supplier_example', 'Brand example under product type.'),
  ('large-format-concrete-block-walls', 'magnumstone-brochure', 'supplier_example', 'Brand example under product type.'),
  ('gabion-gravity-walls', 'maccaferri-gabions-webpage', 'supplier_example', 'General gabion reference.'),
  ('gabion-gravity-walls', 'gabion-gravity-walls-pdf', 'brochure', 'Gabion gravity wall source.'),
  ('gabion-faced-mse-walls', 'gabion-reinforced-earth-walls-pdf', 'brochure', 'Gabion reinforced earth source.'),
  ('vegetated-reinforced-soil-slopes', 'terramesh-natural-pdf', 'brochure', 'Vegetated RSS source.'),
  ('rock-faced-mse-rss-walls', 'terramesh-rock-faced-pdf', 'brochure', 'Rock-faced MSE/RSS source.'),
  ('geogrid-reinforced-soil-slopes', 'geogrid-reinforced-earth-slopes-pdf', 'brochure', 'Geogrid reinforced slope source.'),
  ('concrete-panel-mse-walls', 'concrete-panel-walls-pdf', 'brochure', 'Concrete panel MSE source.'),
  ('concrete-sleeper-walls', 'concrete-sleeper-wall-section-pdf', 'manual', 'Concrete sleeper wall section source.')
) as x(product_slug, source_slug, relationship_type, note)
join public.product_types p on p.slug = x.product_slug
join public.sources s on s.slug = x.source_slug
on conflict (product_type_id, source_id) do update set
  relationship_type = excluded.relationship_type,
  note = excluded.note;

insert into public.glossary_terms
(slug, term, plain_definition, technical_note, related_product_slugs, source_status)
values
('gravity-wall', 'Gravity wall', 'A retaining wall that mainly relies on its own mass and geometry to resist soil pressure.', 'Common examples include crib walls, gabions, sandstone walls and some large block walls.', array['concrete-crib-walls','gabion-gravity-walls','cut-sandstone-gravity-walls','large-format-concrete-block-walls'], 'seeded'),
('mse-wall', 'MSE wall', 'Mechanically Stabilised Earth wall: a wall where compacted backfill is reinforced with layers such as geogrid, mesh or strips.', 'The facing does not work alone; the reinforced soil mass is part of the structure.', array['gabion-faced-mse-walls','rock-faced-mse-rss-walls','concrete-panel-mse-walls','segmental-block-retaining-walls'], 'seeded'),
('rss', 'RSS', 'Reinforced Soil Slope: a reinforced earth slope, usually with a sloped or vegetated face rather than a vertical wall face.', 'RSS systems often use geogrid or mesh reinforcement and erosion protection at the face.', array['vegetated-reinforced-soil-slopes','geogrid-reinforced-soil-slopes'], 'seeded'),
('geogrid', 'Geogrid', 'A geosynthetic grid material placed in compacted soil to provide tensile reinforcement.', 'Correct product, orientation, length, overlap and connection are critical.', array['segmental-block-retaining-walls','gabion-faced-mse-walls','geogrid-reinforced-soil-slopes','concrete-panel-mse-walls'], 'seeded'),
('surcharge', 'Surcharge', 'Extra load near or behind the wall, such as vehicles, stockpiles, buildings, fences or slopes.', 'Surcharge can increase earth pressure and must be considered by the designer.', array[]::text[], 'seeded'),
('bearing-capacity', 'Bearing capacity', 'The ability of the foundation ground to support the weight/load from the wall without failure or excessive settlement.', 'Weak foundation material may require redesign, replacement, deeper embedment or geotechnical advice.', array[]::text[], 'seeded'),
('friction-angle', 'Friction angle', 'A soil strength parameter that helps describe how soil resists sliding or shearing.', 'It is used in retaining wall design and depends on soil type, density and condition.', array[]::text[], 'seeded'),
('cohesion', 'Cohesion', 'A soil strength property describing how soil particles stick together.', 'Clay can show cohesion, but site behaviour depends on moisture and actual geotechnical conditions.', array[]::text[], 'seeded'),
('ag-pipe', 'Ag pipe', 'A perforated drainage pipe used to collect and discharge water from behind a retaining wall.', 'It must fall to a suitable outlet; a flat or blocked pipe can create water pressure behind the wall.', array[]::text[], 'seeded'),
('geotextile', 'Geotextile', 'A permeable fabric used to separate, filter, protect or drain soil and aggregate layers.', 'Commonly used to stop fines migrating into drainage aggregate.', array[]::text[], 'seeded'),
('hold-point', 'Hold point', 'A required stop/check stage where work should not continue until inspection, approval or verification is completed.', 'Examples can include foundation inspection, material certificate review and compaction testing.', array[]::text[], 'seeded')
on conflict (slug) do update set
  term = excluded.term,
  plain_definition = excluded.plain_definition,
  technical_note = excluded.technical_note,
  related_product_slugs = excluded.related_product_slugs,
  source_status = excluded.source_status;

insert into public.training_modules
(slug, title, description, module_status, estimated_minutes)
values
('retaining-wall-basics', 'Retaining Wall Basics', 'Introductory module covering retaining wall families, basic terminology, drainage, soil concepts and common Fencepac wall system types.', 'draft', 35)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  module_status = excluded.module_status,
  estimated_minutes = excluded.estimated_minutes;

insert into public.training_lessons
(module_id, lesson_order, title, summary, content, related_product_slugs, source_status)
select m.id, x.lesson_order, x.title, x.summary, x.content, x.related_product_slugs, 'seeded'
from public.training_modules m
join (
  values
  (1, 'Main retaining wall families', 'Overview of the wall system types used in this platform.', 'Fencepac retaining wall knowledge is organised by wall system type, not by supplier brand. The main families in this MVP are gravity walls, segmental block walls, gabion walls, reinforced soil slopes, MSE walls, concrete panel walls and concrete sleeper walls.', array[]::text[]),
  (2, 'Gravity walls vs reinforced earth walls', 'Difference between mass-based walls and reinforced soil systems.', 'Gravity walls rely mainly on wall mass and geometry. Reinforced earth systems rely on a reinforced soil mass, usually created with geogrid, mesh, strips or similar reinforcement placed in compacted backfill.', array['concrete-crib-walls','gabion-gravity-walls','gabion-faced-mse-walls','concrete-panel-mse-walls']),
  (3, 'Drainage basics', 'Why water management matters behind retaining walls.', 'Water behind a wall can increase pressure and cause problems. Many wall systems include free-draining material, geotextile separation and ag pipe outlets. Drainage must follow the project design.', array['concrete-crib-walls','segmental-block-retaining-walls','concrete-sleeper-walls']),
  (4, 'Soil and surcharge basics', 'Simple explanation of bearing capacity, friction angle, cohesion and surcharge.', 'Retaining wall behaviour depends on retained material, foundation material, backfill, surcharge and drainage. Workers should know these terms and escalate when site conditions differ from the drawings or design assumptions.', array[]::text[]),
  (5, 'Product type overview', 'Quick overview of each product/system type in the MVP.', 'The platform covers concrete crib walls, cut sandstone walls, segmental block walls, large format concrete block walls, gabion gravity walls, gabion-faced MSE walls, vegetated reinforced soil slopes, rock-faced MSE/RSS walls, geogrid reinforced slopes, concrete panel MSE walls and concrete sleeper walls.', array[]::text[]),
  (6, 'Common site risks', 'Typical issues workers should recognise and escalate.', 'Common risks include poor drainage, unsuitable foundation material, uncontrolled surcharge near the crest, missing hold points, wrong reinforcement orientation, poor compaction, damaged components and using supplier brochures instead of project-specific design documents.', array[]::text[])
) as x(lesson_order, title, summary, content, related_product_slugs)
on m.slug = 'retaining-wall-basics'
on conflict (module_id, lesson_order) do update set
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  related_product_slugs = excluded.related_product_slugs,
  source_status = excluded.source_status;

insert into public.quiz_questions
(module_id, question_order, question, options, correct_answer, explanation, source_status)
select m.id, x.question_order, x.question, x.options::jsonb, x.correct_answer, x.explanation, 'seeded'
from public.training_modules m
join (
  values
  (1, 'What does a gravity retaining wall mainly rely on?', '["Wall mass and geometry", "Paint colour", "Only geogrid", "Timber pegs"]', 'Wall mass and geometry', 'A gravity wall mainly uses its own weight/mass and geometry to resist retained soil pressure.'),
  (2, 'What does MSE stand for?', '["Mechanically Stabilised Earth", "Manual Stone Elevation", "Main Soil Excavation", "Masonry Safety Edge"]', 'Mechanically Stabilised Earth', 'MSE walls use reinforced soil/backfill as part of the retaining structure.'),
  (3, 'Why is drainage important behind retaining walls?', '["It can reduce water pressure behind the wall", "It makes the wall look darker", "It replaces compaction", "It removes the need for design"]', 'It can reduce water pressure behind the wall', 'Poor drainage can create hydrostatic pressure and increase risk.'),
  (4, 'Where should Keystone 133 Elite sit in the knowledge platform?', '["As an example under Segmental Block Retaining Walls", "As the only wall type", "As a concrete sleeper wall", "As a gabion basket"]', 'As an example under Segmental Block Retaining Walls', 'The platform uses wall system types as main topics; brand products sit under the relevant type.'),
  (5, 'What should workers do if site conditions differ from drawings or design assumptions?', '["Stop and escalate for clarification", "Guess from a brochure", "Ignore it", "Cover it with backfill quickly"]', 'Stop and escalate for clarification', 'Differences in foundation, drainage, fill or surcharge can affect wall safety and must be escalated.')
) as x(question_order, question, options, correct_answer, explanation)
on m.slug = 'retaining-wall-basics'
on conflict (module_id, question_order) do update set
  question = excluded.question,
  options = excluded.options,
  correct_answer = excluded.correct_answer,
  explanation = excluded.explanation,
  source_status = excluded.source_status;

insert into public.evidence_notes
(product_type_id, source_id, title, body, evidence_type, page_reference, section_reference, confidence, review_status)
select
  p.id,
  s.id,
  x.title,
  x.body,
  x.evidence_type,
  x.page_reference,
  x.section_reference,
  x.confidence,
  x.review_status
from (
  values
  (
    'concrete-crib-walls',
    'concrete-crib-units-pdf',
    'Crib wall components',
    'Concrete crib retaining walls are represented in the source register as systems made from components such as headers, stretchers, closers, back stretchers, spacer blocks and taper units.',
    'component_note',
    'Page 1',
    'Components table',
    'medium',
    'needs_review'
  ),
  (
    'concrete-crib-walls',
    'crib-single-construction-pdf',
    'Crib wall drainage elements',
    'The single construction crib wall source record includes free-draining granular material, geotextile separation and ag pipe drainage as key construction elements.',
    'installation_note',
    'Page 1',
    'Typical cross-section',
    'medium',
    'needs_review'
  ),
  (
    'segmental-block-retaining-walls',
    'keystone-133-elite-brochure',
    'Segmental block walls as system type',
    'Keystone 133 Elite is stored as a supplier product example under the broader wall system type Segmental Block Retaining Walls, not as a top-level wall system.',
    'general_note',
    null,
    'Product classification decision',
    'high',
    'needs_review'
  ),
  (
    'large-format-concrete-block-walls',
    'magnumstone-brochure',
    'Large format concrete block wall example',
    'MagnumStone is stored as a supplier product example under Large Format Concrete Block Retaining Walls. The system may be used in gravity or reinforced configurations depending on design.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'gabion-gravity-walls',
    'gabion-gravity-walls-pdf',
    'Gabion gravity wall principle',
    'Gabion gravity walls are stored as rock-filled wire basket gravity wall systems, separate from gabion-faced reinforced earth systems.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'gabion-faced-mse-walls',
    'gabion-reinforced-earth-walls-pdf',
    'Gabion-faced MSE distinction',
    'Gabion-faced MSE walls are classified separately from gabion gravity walls because the reinforced soil mass contributes to the retaining system.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'vegetated-reinforced-soil-slopes',
    'terramesh-natural-pdf',
    'Vegetated reinforced soil slope',
    'Vegetated reinforced soil slopes are classified as reinforced soil slope systems with an inclined vegetated face and reinforcement extending into compacted backfill.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'rock-faced-mse-rss-walls',
    'terramesh-rock-faced-pdf',
    'Rock-faced reinforced soil system',
    'Rock-faced MSE/RSS walls are classified as reinforced soil systems with a rock-faced mesh or gabion-style face, separate from basic gabion gravity walls.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'geogrid-reinforced-soil-slopes',
    'geogrid-reinforced-earth-slopes-pdf',
    'Geogrid reinforced slope concept',
    'Geogrid reinforced soil slopes are classified as reinforced earthworks where geogrid layers and compacted fill work together to stabilise a slope or embankment.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'concrete-panel-mse-walls',
    'concrete-panel-walls-pdf',
    'Concrete panel MSE wall concept',
    'Concrete panel MSE walls are classified as reinforced earth systems using concrete facing panels connected to soil reinforcement within engineered backfill.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'concrete-sleeper-walls',
    'concrete-sleeper-wall-section-pdf',
    'Concrete sleeper wall system',
    'Concrete sleeper retaining walls are classified as vertical post-and-panel retaining wall systems, distinct from gravity walls and MSE walls.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  )
) as x(product_slug, source_slug, title, body, evidence_type, page_reference, section_reference, confidence, review_status)
join public.product_types p on p.slug = x.product_slug
join public.sources s on s.slug = x.source_slug
where not exists (
  select 1
  from public.evidence_notes existing
  where existing.product_type_id = p.id
    and existing.source_id = s.id
    and existing.title = x.title
);

insert into public.evidence_notes
(product_type_id, source_id, title, body, evidence_type, page_reference, section_reference, confidence, review_status)
select
  p.id,
  s.id,
  x.title,
  x.body,
  x.evidence_type,
  x.page_reference,
  x.section_reference,
  x.confidence,
  x.review_status
from (
  values
  (
    'concrete-crib-walls',
    'concrete-crib-units-pdf',
    'Crib wall components',
    'Concrete crib retaining walls are represented in the source register as systems made from components such as headers, stretchers, closers, back stretchers, spacer blocks and taper units.',
    'component_note',
    'Page 1',
    'Components table',
    'medium',
    'needs_review'
  ),
  (
    'concrete-crib-walls',
    'crib-single-construction-pdf',
    'Crib wall drainage elements',
    'The single construction crib wall source record includes free-draining granular material, geotextile separation and ag pipe drainage as key construction elements.',
    'installation_note',
    'Page 1',
    'Typical cross-section',
    'medium',
    'needs_review'
  ),
  (
    'segmental-block-retaining-walls',
    'keystone-133-elite-brochure',
    'Segmental block walls as system type',
    'Keystone 133 Elite is stored as a supplier product example under the broader wall system type Segmental Block Retaining Walls, not as a top-level wall system.',
    'general_note',
    null,
    'Product classification decision',
    'high',
    'needs_review'
  ),
  (
    'large-format-concrete-block-walls',
    'magnumstone-brochure',
    'Large format concrete block wall example',
    'MagnumStone is stored as a supplier product example under Large Format Concrete Block Retaining Walls. The system may be used in gravity or reinforced configurations depending on design.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'gabion-gravity-walls',
    'gabion-gravity-walls-pdf',
    'Gabion gravity wall principle',
    'Gabion gravity walls are stored as rock-filled wire basket gravity wall systems, separate from gabion-faced reinforced earth systems.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'gabion-faced-mse-walls',
    'gabion-reinforced-earth-walls-pdf',
    'Gabion-faced MSE distinction',
    'Gabion-faced MSE walls are classified separately from gabion gravity walls because the reinforced soil mass contributes to the retaining system.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'vegetated-reinforced-soil-slopes',
    'terramesh-natural-pdf',
    'Vegetated reinforced soil slope',
    'Vegetated reinforced soil slopes are classified as reinforced soil slope systems with an inclined vegetated face and reinforcement extending into compacted backfill.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'rock-faced-mse-rss-walls',
    'terramesh-rock-faced-pdf',
    'Rock-faced reinforced soil system',
    'Rock-faced MSE/RSS walls are classified as reinforced soil systems with a rock-faced mesh or gabion-style face, separate from basic gabion gravity walls.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'geogrid-reinforced-soil-slopes',
    'geogrid-reinforced-earth-slopes-pdf',
    'Geogrid reinforced slope concept',
    'Geogrid reinforced soil slopes are classified as reinforced earthworks where geogrid layers and compacted fill work together to stabilise a slope or embankment.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'concrete-panel-mse-walls',
    'concrete-panel-walls-pdf',
    'Concrete panel MSE wall concept',
    'Concrete panel MSE walls are classified as reinforced earth systems using concrete facing panels connected to soil reinforcement within engineered backfill.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  ),
  (
    'concrete-sleeper-walls',
    'concrete-sleeper-wall-section-pdf',
    'Concrete sleeper wall system',
    'Concrete sleeper retaining walls are classified as vertical post-and-panel retaining wall systems, distinct from gravity walls and MSE walls.',
    'general_note',
    null,
    'Product classification decision',
    'medium',
    'needs_review'
  )
) as x(product_slug, source_slug, title, body, evidence_type, page_reference, section_reference, confidence, review_status)
join public.product_types p on p.slug = x.product_slug
join public.sources s on s.slug = x.source_slug
where not exists (
  select 1
  from public.evidence_notes existing
  where existing.product_type_id = p.id
    and existing.source_id = s.id
    and existing.title = x.title
);
