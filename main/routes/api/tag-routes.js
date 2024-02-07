const router = require('express').Router();
const { where } = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
try {
  const allTags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag}],
  });
  res.status(200).json(allTags);
} catch (error) {
  res.status(500).json(error);
}
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const oneTag = await Tag.findOne({
      where: { id: req.params.id},
      include: [{ model: Product, through: ProductTag}],
    });
    res.status(200).json(oneTag);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
  const createTag = await Tag.create(req.body);
  res.status(200).json(createTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
  const updateTag = await Tag.update(req.body, {where: { id: req.params.id}});
  res.status(200).json(updateTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
  const deleteTag = await Tag.destroy({where: { id: req.params.id}});
  res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
