class RemoveZombieidFromSupport < ActiveRecord::Migration
  def self.up
    remove_column :supports, :zombie_id
  end

  def self.down
    add_column :supports, :zombie_id, :integer
  end
end
