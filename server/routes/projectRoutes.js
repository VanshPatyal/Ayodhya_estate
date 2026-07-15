const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
  try {
    const { name, slug, tagline, description, status, heroImage, amenities, connectivity, gallery } = req.body;

    if (!name || !slug || !description || !heroImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return res.status(409).json({ 
        success: false, 
        message: 'A project with this slug already exists' 
      });
    }

    const project = new Project({
      name,
      slug,
      tagline,
      description,
      status,
      heroImage,
      amenities: amenities || [],
      connectivity: connectivity || [],
      gallery: gallery || []
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;

    const project = await Project.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOneAndDelete({ slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
