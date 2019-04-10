const React = require('react');

class Block extends React.Component {}

Block.Image = require('./image');
Block.Content = require('./content');
Block.Bubble = require('./bubble');

module.exports = Block;
